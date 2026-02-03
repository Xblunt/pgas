import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { AuthStore } from "@/stores";
import Injector from "@/utils/injector";
import { AUTH_STORE } from "@/stores/identifiers";
import { decodeJwtPayload, decodeUserName, extractTokens } from "@/utils/jwt";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000").replace(/\/+$/, "");

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const ROOT = "root"
export const USER_DATA = "user_data"

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const refreshClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

let showToastFunc: (message: string, type: "success" | "error") => void;

export const setToastFunction = (toastFunction: (message: string, type: "success" | "error") => void) => {
    showToastFunc = toastFunction;
};

const safeGetAuthStore = (): AuthStore | null => {
    try {
        return Injector.get<AuthStore>(AUTH_STORE);
    } catch {
        return null;
    }
};

const readAccessFromStorage = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
};

const readRefreshFromStorage = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(REFRESH_TOKEN_KEY) || "";
};

const handleApiError = (error: any) => {
    let errorMessage = "Что-то пошло не так";

    if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
    } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
    } else if (error.message) {
        errorMessage = error.message;
    }

    if (showToastFunc) {
        showToastFunc(errorMessage, "error");
    }

    return Promise.reject(error);
};

let isRefreshing = false;
let refreshQueue: Array<{ 
    resolve: (token: string) => void; 
    reject: (error: any) => void;
} > = [];

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
    _isRefresh?: boolean;
}

const subscribeTokenRefresh = (callback: { 
    resolve: (token: string) => void; 
    reject: (error: any) => void;
}) => {
    refreshQueue.push(callback);
};

const onRefreshed = (token: string) => {
    refreshQueue.forEach(({ resolve }) => resolve(token));
    refreshQueue = [];
};

const onRefreshFailed = (error: any) => {
    refreshQueue.forEach(({ reject }) => reject(error));
    refreshQueue = [];
};

const refreshAccessToken = async (refreshToken: string) => {
    try {
        const response = await refreshClient.post(
            "/auth/refresh-token",
            null,
            {
                headers: { 
                    Authorization: `Bearer ${refreshToken}` 
                },
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

apiClient.interceptors.request.use(
    (config: ExtendedAxiosRequestConfig) => {
        if (config._isRefresh) {
            return config;
        }

        const authStore = safeGetAuthStore();
        const token = authStore?.token || readAccessFromStorage();

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return handleApiError(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<any>) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;
        const status = error.response?.status;

        if (!originalRequest || originalRequest._isRefresh) {
            return handleApiError(error);
        }

        if (status !== 401) {
            return handleApiError(error);
        }

        if (originalRequest._retry) {
            return handleApiError(error);
        }

        const authStore = safeGetAuthStore();
        const refreshToken = authStore?.refreshToken || readRefreshFromStorage();

        if (!refreshToken) {
            authStore?.logout?.();
            if (showToastFunc) {
                showToastFunc("Сессия истекла. Пожалуйста, войдите снова", "error");
            }
            return handleApiError(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribeTokenRefresh({
                    resolve: (newToken: string) => {
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        resolve(apiClient(originalRequest));
                    },
                    reject: (err: any) => {
                        reject(err);
                    }
                });
            });
        }

        isRefreshing = true;

        try {
            const response = await refreshAccessToken(refreshToken);
            
            const tokens = extractTokens(response.data);
            const accessToken = tokens.accessToken;
            const newRefreshToken = tokens.refreshToken || refreshToken;
            
            authStore?.setTokens?.(accessToken, newRefreshToken);
            
            const payload = decodeJwtPayload(accessToken);
            console.log('payload', payload)
            if (!authStore) {
                if (typeof window !== "undefined") {
                    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
                    localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
                    
                    if (payload.is_admin !== undefined) {
                        localStorage.setItem(ROOT, String(payload.is_admin));
                    }
                    
                    const decodedName = decodeUserName(payload.user.name);
                    
                    localStorage.setItem(USER_DATA, decodedName);
                }
            }

            onRefreshed(accessToken);
            
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            
            return apiClient(originalRequest);
        } catch (refreshError: any) {
            onRefreshFailed(refreshError);
            authStore?.logout?.();
            
            if (showToastFunc) {
                showToastFunc("Сессия истекла. Пожалуйста, войдите снова", "error");
            }
            
            return handleApiError(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default apiClient;
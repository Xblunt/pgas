import axios, { AxiosError, AxiosResponse } from "axios";
import type { AuthStore } from "@/stores";
import Injector from "@/utils/injector";
import { AUTH_STORE } from "@/stores/identifiers";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000").replace(/\/+$/, "");

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

interface ApiErrorShape {
    status?: number;
    message: string;
    data?: any;
}

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

const extractTokens = (payload: any): { accessToken: string; refreshToken: string } => {
    const root = payload?.data ?? payload?.result ?? payload;

    const accessToken =
        root?.access_token ?? root?.accessToken ?? root?.AccessToken ?? payload?.access_token ?? payload?.accessToken ?? payload?.AccessToken;

    const refreshToken =
        root?.refresh_token ?? root?.refreshToken ?? root?.RefreshToken ?? payload?.refresh_token ?? payload?.refreshToken ?? payload?.RefreshToken;

    if (!accessToken || !refreshToken) {
        throw new Error("Не удалось получить токены из ответа сервера");
    }

    return { accessToken, refreshToken };
};

const handleApiError = (error: any) => {
    const apiError: ApiErrorShape = {
        message: "Что-то пошло не так",
        status: error.response?.status,
        data: error.response?.data,
    };

    if (error.response) {
        if (error.response.status === 401) {
            apiError.message = "Неавторизованный доступ. Пожалуйста, войдите снова.";
        } else if (error.response.status === 403) {
            apiError.message = "Доступ запрещен";
        } else if (error.response.status === 404) {
            apiError.message = "Ресурс не найден";
        } else if (error.response.status === 422) {
            apiError.message = "Некорректные данные";
        } else if (error.response.status === 500) {
            apiError.message = "Внутренняя ошибка сервера";
        } else if (error.response.data?.message) {
            apiError.message = error.response.data.message;
        }
    } else if (error.request) {
        apiError.message = "Нет ответа от сервера. Проверьте подключение к интернету.";
    } else {
        apiError.message = error.message || "Что-то пошло не так";
    }

    if (showToastFunc) {
        showToastFunc(apiError.message, "error");
    }

    return Promise.reject(error);
};

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshQueue.push(cb);
};

const onRefreshed = (token: string) => {
    refreshQueue.forEach((cb) => cb(token));
    refreshQueue = [];
};

apiClient.interceptors.request.use(
    (config) => {
        const authStore = safeGetAuthStore();
        const token = authStore?.token || readAccessFromStorage();

        const headers: any = config.headers ?? {};
        if (!headers.Authorization && token) {
            headers.Authorization = `Bearer ${token}`;
        }
        config.headers = headers;

        return config;
    },
    (error) => {
        return handleApiError(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<any>) => {
        const originalRequest: any = error.config as any;
        const status = error.response?.status;

        if (!originalRequest || originalRequest._skipRefresh) {
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
            authStore?.clearStore?.();
            return handleApiError(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve) => {
                subscribeTokenRefresh((newAccessToken) => {
                    originalRequest.headers = originalRequest.headers ?? {};
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    resolve(apiClient(originalRequest));
                });
            });
        }

        isRefreshing = true;

        try {
            const resp = await apiClient.post(
                "/auth/refresh-token",
                null,
                {
                    headers: { Authorization: `Bearer ${refreshToken}` },
                    ...( { _skipRefresh: true } as any ),
                } as any
            );

            const tokens = extractTokens(resp.data);
            authStore?.setTokens(tokens.accessToken, tokens.refreshToken);

            if (!authStore) {
                if (typeof window !== "undefined") {
                    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
                    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
                }
            }

            onRefreshed(tokens.accessToken);

            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

            return apiClient(originalRequest);
        } catch (e) {
            authStore?.clearStore?.();
            return handleApiError(e);
        } finally {
            isRefreshing = false;
        }
    }
);

export default apiClient;

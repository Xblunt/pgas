import { HttpClient } from "./axios/HttpClient";
import AuthStore from "@/stores/auth.store";
import Injector from "@/utils/injector";
import { AUTH_STORE } from "@/stores/identifiers";
import { extractTokens } from "@/utils/jwt";
import { toRFC3339BirthDate } from "@/utils/date";
import { SignIn, Tokens } from "@/models/Auth";
import { User } from "@/models/User";
import { Api } from "@/models/types";

class AuthService extends HttpClient {
  private static instance: AuthService;
  private _authStore: AuthStore;

  constructor() {
    super();
    this._authStore = Injector.get<AuthStore>(AUTH_STORE);
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  signIn(creds: SignIn): Promise<Tokens> {
    this._authStore.setLoading(true);
    
    return this.post<Api<Tokens>>("/auth/signin", { ...creds })
      .then(payload => {
        const tokens = extractTokens(payload.data);
        this._authStore.setTokens(tokens.accessToken, tokens.refreshToken);
        return tokens;
      })
      .catch(error => {
        console.error("Error during sign in:", error);
        throw error;
      })
      .finally(() => {
        this._authStore.setLoading(false);
      });
  }

  signUp(data: User): Promise<Tokens> {
    this._authStore.setLoading(true);
    
    const payloadToSend = {
      ...data,
      birth_date: toRFC3339BirthDate(data?.birth_date),
    };

    return this.post<Api<Tokens>>("/auth/signup", payloadToSend)
      .then(payload => {
        const tokens = extractTokens(payload.data);
        this._authStore.setTokens(tokens.accessToken, tokens.refreshToken);
        return tokens;
      })
      .catch(error => {
        console.error("Error during sign up:", error);
        throw error;
      })
      .finally(() => {
        this._authStore.setLoading(false);
      });
  }

  refreshTokens(): Promise<Tokens> {
    const refreshToken = this._authStore.refreshToken;
    
    if (!refreshToken) {
      return Promise.reject(new Error("Refresh token не найден"));
    }

    return this.post<any>(
      "/auth/refresh-token",
      null,
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    )
      .then(payload => {
        const tokens = extractTokens(payload.data);
        this._authStore.setTokens(tokens.accessToken, tokens.refreshToken);
        return tokens;
      })
      .catch(error => {
        console.error("Error refreshing tokens:", error);
        throw error;
      });
  }

  changePassword(password: string): Promise<void> {
    this._authStore.setLoading(true);

    return this.post<any>("/auth/change-password", { password })
      .then((response) => {
         return response.data;
      })
      .catch(error => {
        console.error("Error changing password:", error);
        throw error;
      })
      .finally(() => {
        this._authStore.setLoading(false);
      });
  }

  logout(): void {
    this._authStore.logout();
  }
}

export default AuthService;
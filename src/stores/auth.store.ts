import { makeAutoObservable, runInAction } from "mobx";
import type RootStore from "./root.store";
import AuthService from "@/services/auth.service";
import type { CreateUser } from "@/models/User";
import type { SignIn } from "@/models/Auth";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

class AuthStore {
  private _rootStore: RootStore;
  private _service: AuthService;

  private _token: string = "";
  private _refreshToken: string = "";
  private _isLoading: boolean = false;
  private _isHydrated: boolean = false;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    this._service = new AuthService();
    makeAutoObservable(this);
  }

  get token() {
    return this._token;
  }

  get refreshToken() {
    return this._refreshToken;
  }

  get isLoading() {
    return this._isLoading;
  }

  get isHydrated() {
    return this._isHydrated;
  }

  get isAuthenticated() {
    return Boolean(this._token);
  }

  setLoading = (loading: boolean) => {
    this._isLoading = loading;
  };

  hydrate = () => {
    if (typeof window === "undefined") return;

    const access = localStorage.getItem(ACCESS_TOKEN_KEY) || "";
    const refresh = localStorage.getItem(REFRESH_TOKEN_KEY) || "";

    this._token = access;
    this._refreshToken = refresh;
    this._isHydrated = true;

    window.addEventListener("storage", this.onStorageChange);
  };

  private onStorageChange = (e: StorageEvent) => {
    if (e.key !== ACCESS_TOKEN_KEY && e.key !== REFRESH_TOKEN_KEY) return;

    const access = localStorage.getItem(ACCESS_TOKEN_KEY) || "";
    const refresh = localStorage.getItem(REFRESH_TOKEN_KEY) || "";

    runInAction(() => {
      this._token = access;
      this._refreshToken = refresh;
    });
  };

  dispose = () => {
    if (typeof window === "undefined") return;
    window.removeEventListener("storage", this.onStorageChange);
  };

  setToken = (token: string) => {
    this._token = token || "";
    if (typeof window !== "undefined") {
      if (this._token) localStorage.setItem(ACCESS_TOKEN_KEY, this._token);
      else localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  };

  setRefreshToken = (token: string) => {
    this._refreshToken = token || "";
    if (typeof window !== "undefined") {
      if (this._refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, this._refreshToken);
      else localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  };

  setTokens = (accessToken: string, refreshToken: string) => {
    this.setToken(accessToken);
    this.setRefreshToken(refreshToken);
  };

  clearStore = () => {
    this._token = "";
    this._refreshToken = "";
    this._isLoading = false;

    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  };

  logout = () => {
    this.clearStore();
    this._rootStore.userStore.clearStore();
    this._rootStore.profileStore.clearStore();
    this._rootStore.categoryStore.clearStore();
    this._rootStore.raitingStore.clearStore();
    this._rootStore.achievementStore.clearStore();
  };

  signIn = async (data: SignIn) => {
    this.setLoading(true);
    try {
      const tokens = await this._service.signIn(data.email.trim(), data.password.trim());
      runInAction(() => {
        this.setTokens(tokens.accessToken, tokens.refreshToken);
      });
      return tokens;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  signUp = async (data: CreateUser) => {
    this.setLoading(true);
    try {
      const tokens = await this._service.signUp(data);
      runInAction(() => {
        this.setTokens(tokens.accessToken, tokens.refreshToken);
      });
      return tokens;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  refreshTokens = async () => {
    const ref = this._refreshToken;
    if (!ref) throw new Error("Refresh token не найден");

    const tokens = await this._service.refreshToken(ref);
    runInAction(() => {
      this.setTokens(tokens.accessToken, tokens.refreshToken);
    });
    return tokens;
  };

  changePassword = async (password: string) => {
    this.setLoading(true);
    try {
      if (!this._token) throw new Error("Смена пароля доступна только после входа в систему");
      await this._service.changePassword(password);
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };
}

export default AuthStore;

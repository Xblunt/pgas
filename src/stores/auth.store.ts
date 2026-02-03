import { makeAutoObservable } from "mobx";
import type RootStore from "./root.store";
import { ROOT, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA } from "@/services/axios/ApiClient";
import { decodeJwtPayload, decodeUserName } from "@/utils/jwt";

class AuthStore {
  private _rootStore: RootStore;

  private _token: string = "";
  private _refreshToken: string = "";
  private _isLoading: boolean = false;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
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


  get isAuthenticated() {
    return Boolean(this._token);
  }

  setLoading = (loading: boolean) => {
    this._isLoading = loading;
  };

  setToken = (token?: string) => {
    this._token = token || "";
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
      else {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(ROOT);
        localStorage.removeItem(USER_DATA);
      }
    }
  };

  setRefreshToken = (token?: string) => {
    this._refreshToken = token || "";
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token);
      else {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    }
  };

  setUserDataToken = (data?: string) => {
    if (typeof window !== "undefined") {
      if(data) localStorage.setItem(USER_DATA, data);
    }
  };

  setIsAdmin = (data?: boolean) => {
    if (typeof window !== "undefined") {
      if (data !== undefined) {
        localStorage.setItem(ROOT, String(data));
      }
    }
  };

  setTokens = (accessToken: string, refreshToken: string) => {
    this.setToken(accessToken);
    this.setRefreshToken(refreshToken);
    const payload = decodeJwtPayload(accessToken)
    const decodedName = decodeUserName(payload.user.name);
    this.setUserDataToken(decodedName);
    this.setIsAdmin(payload.is_admin);
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
}

export default AuthStore;
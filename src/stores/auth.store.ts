import { makeAutoObservable } from "mobx";
import type RootStore from "./root.store";
import { ROOT, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/services/axios/ApiClient";

class AuthStore {
  private _rootStore: RootStore;
  private _isRoot: boolean = false;

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

  get isRoot() {
    return this._isRoot;
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

  setRoot = (isRoot: boolean) => {
    this._isRoot = isRoot;
    if (typeof window !== "undefined") { 
      localStorage.setItem(ROOT, this._token);
    }
    
  };

  setToken = (token?: string) => {
    this._token = token || "";
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
      else localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  };

  setRefreshToken = (token?: string) => {
    this._refreshToken = token || "";
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token);
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
    this._isRoot = false;

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
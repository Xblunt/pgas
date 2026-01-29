import { makeAutoObservable } from "mobx";
import RootStore from "./root.store";

class AuthStore {
  private _token: string | null = null;
  private _isLoading: boolean = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  setLoading = (loading: boolean) => {
    this._isLoading = loading;
  }

  get token() {
    return this._token;
  }

  setToken (token: string) {
    this._token = token;
  }

  clearStore() {
    this._isLoading = false;
    this._token = null;
  }
}

export default AuthStore;

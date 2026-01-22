import { makeAutoObservable } from "mobx";
import RootStore from "./root.store";

class AuthStore {
  private _token: string | null = null;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get token() {
    return this._token;
  }

  setToken (token: string) {
    this._token = token;
  }

  clearStore() {
    this._token = null;
  }
}

export default AuthStore;

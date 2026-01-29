import { makeAutoObservable } from "mobx";

class ProfileStore {
  private _isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  setLoading = (loading: boolean) => {
    this._isLoading = loading;
  }

  clearStore() {
    this._isLoading = false;
  }
}

export default ProfileStore;

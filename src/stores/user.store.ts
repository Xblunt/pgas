import { makeAutoObservable } from "mobx";

class UserStore {
  private _isVisible: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isVisible() {
    return this._isVisible;
  }

  clearStore() {
    this._isVisible = false;
  }
}

export default UserStore;

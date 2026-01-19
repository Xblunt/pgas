import { makeAutoObservable } from "mobx";

class AdminStore {
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

export default AdminStore;
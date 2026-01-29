import { makeAutoObservable } from "mobx";

class CategoryStore {
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

export default CategoryStore;
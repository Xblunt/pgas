import { Category } from "@/models/Category";
import { makeAutoObservable } from "mobx";

class CategoryStore {
  private _isLoading: boolean = false;
  private _categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get categories() {
    return this._categories;
  }

  setLoading = (loading: boolean) => {
    this._isLoading = loading;
  }

  setCategories = (categories: Category[]) => {
    this._categories = categories;
  }

  clearStore() {
    this._isLoading = false;
    this._categories = [];
  }
}

export default CategoryStore;
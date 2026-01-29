import { AuthStore, CategoryStore } from "@/stores";
import { AUTH_STORE, CATEGORY_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";
import { HttpClient } from "./axios/HttpClient";

class CategoryService extends HttpClient {
  private _authStore: AuthStore;
  private _categoryStore: CategoryStore;

  constructor() {
    super();
    this._authStore = Injector.get<AuthStore>(AUTH_STORE);
    this._categoryStore = Injector.get<CategoryStore>(CATEGORY_STORE);
  }

}

export default CategoryService;
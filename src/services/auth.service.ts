import { AuthStore } from "@/stores";
import { AUTH_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";
import { HttpClient } from "./axios/HttpClient";

class AuthService extends HttpClient {
  private _authStore: AuthStore;

  constructor() {
    super();
    this._authStore = Injector.get<AuthStore>(AUTH_STORE);
  }

}

export default AuthService;
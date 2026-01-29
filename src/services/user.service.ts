import { AuthStore, UserStore } from "@/stores";
import { AUTH_STORE, USER_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";
import { HttpClient } from "./axios/HttpClient";

class UserService extends HttpClient {
  private _authStore: AuthStore;
  private _userStore: UserStore;

  constructor() {
    super();
    this._authStore = Injector.get<AuthStore>(AUTH_STORE);
    this._userStore = Injector.get<UserStore>(USER_STORE);
  }

}

export default UserService;
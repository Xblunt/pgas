
import { AuthStore, UserStore } from "@/stores";
import { AUTH_STORE, USER_STORE} from "@/stores/identifiers";
import Injector from "@/utils/injector";

class UserService {
  private _authStore: AuthStore;
  private _userStore: UserStore;
 

  constructor() {
    this._authStore = Injector.get<AuthStore>(AUTH_STORE);
    this._userStore = Injector.get<UserStore>(USER_STORE);
  }

}

export default UserService;

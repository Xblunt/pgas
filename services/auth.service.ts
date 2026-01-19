
import { AuthStore } from "@/stores";
import { AUTH_STORE} from "@/stores/identifiers";
import Injector from "@/utils/injector";

class AuthService {
  private _authStore: AuthStore;
 
  constructor() {
    this._authStore = Injector.get<AuthStore>(AUTH_STORE);
  }

}

export default AuthService;

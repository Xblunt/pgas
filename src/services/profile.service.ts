import { AuthStore, ProfileStore } from "@/stores";
import { AUTH_STORE, PROFILE_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";
import { HttpClient } from "./axios/HttpClient";

class ProfileService extends HttpClient {
  private _authStore: AuthStore;
  private _profileStore: ProfileStore;

  constructor() {
    super();
    this._authStore = Injector.get<AuthStore>(AUTH_STORE);
    this._profileStore = Injector.get<ProfileStore>(PROFILE_STORE);
  }

}

export default ProfileService;
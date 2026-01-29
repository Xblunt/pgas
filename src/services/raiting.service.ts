import { AuthStore, RaitingStore } from "@/stores";
import { AUTH_STORE, RAITING_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";
import { HttpClient } from "./axios/HttpClient";

class RaitingService extends HttpClient {
  private _authStore: AuthStore;
  private _raitingStore: RaitingStore;

  constructor() {
    super();
    this._authStore = Injector.get<AuthStore>(AUTH_STORE);
    this._raitingStore = Injector.get<RaitingStore>(RAITING_STORE);
  }

}

export default RaitingService;
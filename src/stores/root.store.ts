import { AuthStore, UserStore, AdminStore} from "@/stores";

class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  adminStore: AdminStore;

  constructor() {
    this.userStore = new UserStore();
    this.authStore = new AuthStore(this);
    this.adminStore = new AdminStore();
  }
}

export default RootStore;

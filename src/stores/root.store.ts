import { AuthStore, CategoryStore, ProfileStore, RaitingStore, UserStore} from "@/stores";

class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  profileStore: ProfileStore;
  categoryStore: CategoryStore;
  raitingStore: RaitingStore;

  constructor() {
    this.userStore = new UserStore();
    this.authStore = new AuthStore(this);
    this.profileStore = new ProfileStore();
    this.categoryStore = new CategoryStore();
    this.raitingStore = new RaitingStore();
  }
}

export default RootStore;

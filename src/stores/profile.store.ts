import { makeAutoObservable, runInAction } from "mobx";
import ProfileService, { UserProfile } from "@/services/profile.service";
import { CreateUser } from "@/models/User";

class ProfileStore {
  private _isLoading: boolean = false;
  private _isLoaded: boolean = false;
  private _profile: UserProfile | null = null;

  private _service: ProfileService;

  constructor() {
    makeAutoObservable(this);
    this._service = new ProfileService();
  }

  get isLoading() {
    return this._isLoading;
  }

  get isLoaded() {
    return this._isLoaded;
  }

  get profile() {
    return this._profile;
  }

  setLoading = (loading: boolean) => {
    this._isLoading = loading;
  };

  loadMe = async () => {
    this.setLoading(true);
    try {
      const profile = await this._service.getMe();
      runInAction(() => {
        this._profile = profile;
        this._isLoaded = true;
      });
    } finally {
      runInAction(() => {
        this._isLoading = false;
        this._isLoaded = true;
      });
    }
  };

  updateMe = async (profile: CreateUser) => {
    this.setLoading(true);
    try {
      await this._service.updateMe(profile);
      const fresh = await this._service.getMe();
      runInAction(() => {
        this._profile = fresh;
      });
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  };

  clearStore() {
    this._isLoading = false;
    this._isLoaded = false;
    this._profile = null;
  }
}

export default ProfileStore;

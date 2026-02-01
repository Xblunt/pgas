import { User } from "@/models/User";
import { makeAutoObservable } from "mobx";

class ProfileStore {
  private _isLoading: boolean = false;
  private _profile: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get profile() {
    return this._profile;
  }

  setLoading = (loading: boolean) => {
    this._isLoading = loading;
  };

  setProfile = (profile: User | null) => {
    this._profile = profile;
  };

  clearStore = () => {
    this._isLoading = false;
    this._profile = null;
  };
}

export default ProfileStore;
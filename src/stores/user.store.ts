import { UserAchievement } from "@/models/Achievement";
import { Position } from "@/models/User";
import { makeAutoObservable } from "mobx";

class UserStore {
  private _isLoading: boolean = false;
  private _achievements: UserAchievement[] = [];
  private _position: Position | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get position() {
    return this._position;
  }

  get allAchievements() {
    return this._achievements;
  }

  setLoading = (loading: boolean) => {
    this._isLoading = loading;
  }

  setAchievements = (achievements: UserAchievement[]) => {
    this._achievements = achievements;
  }

  setPosition = (position: Position) => {
    this._position = position;
  }

  clearStore() {
    this._isLoading = false;
    this._achievements = [];
    this._position = null;
  }
}

export default UserStore;

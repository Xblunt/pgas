import { SimpleAchievement, UpdateAndViewAchievement, UserAchievement } from "@/models/Achievement";
import { Category, SubCategory } from "@/models/Category";
import { makeAutoObservable } from "mobx";

class AchievementStore {
    private _isLoading: boolean = false;
    private _achievements: UserAchievement[]  = [];

    constructor() {
        makeAutoObservable(this);
    }

    get isLoading() {
        return this._isLoading;
    }

    get achievements() {
        return this._achievements;
    }

    setLoading = (loading: boolean) => {
        this._isLoading = loading;
    };

    setAchievements = (achievements: UserAchievement[]) => {
        this._achievements = achievements;
    };

    clearStore = () => {
        this._isLoading = false;
        this._achievements = [];
        };
    }

export default AchievementStore;
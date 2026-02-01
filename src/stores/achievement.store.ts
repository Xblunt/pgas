import { SimpleAchievement } from "@/models/Achievement";
import { Category, SubCategory } from "@/models/Category";
import { makeAutoObservable } from "mobx";

class AchievementStore {
    private _isLoading: boolean = false;

    private _achievements: SimpleAchievement[] = [];
    private _parentCategories: Category[] = [];
    private _childCategoriesByParent: Record<string, SubCategory[]> = {};

    constructor() {
        makeAutoObservable(this);
    }

    get isLoading() {
        return this._isLoading;
    }

    get achievements() {
        return this._achievements;
    }

    get parentCategories() {
        return this._parentCategories;
    }

    get childCategoriesByParent() {
        return this._childCategoriesByParent;
    }

    setLoading = (loading: boolean) => {
        this._isLoading = loading;
    };

    setAchievements = (achievements: SimpleAchievement[]) => {
        this._achievements = achievements;
    };

    setParentCategories = (categories: Category[]) => {
        this._parentCategories = categories;
    };

    setChildCategories = (parentUuid: string, categories: SubCategory[]) => {
        this._childCategoriesByParent[parentUuid] = categories;
    };

    clearStore = () => {
        this._isLoading = false;
        this._achievements = [];
        this._parentCategories = [];
        this._childCategoriesByParent = {};
        };
    }

export default AchievementStore;
import { makeAutoObservable, runInAction } from "mobx";
import AchievementService, { ApiSimpleAchievement, UpsertAchievementRequest } from "@/services/achievement.service";
import CategoryReadService, { ApiCategory } from "@/services/category.read.service";

class AchievementStore {
    private _achievementService: AchievementService;
    private _categoryReadService: CategoryReadService;

    private _isLoading: boolean = false;
    private _isMutating: boolean = false;

    private _achievements: ApiSimpleAchievement[] = [];
    private _parentCategories: ApiCategory[] = [];
    private _childCategoriesByParent: Record<string, ApiCategory[]> = {};

    constructor() {
        this._achievementService = new AchievementService();
        this._categoryReadService = new CategoryReadService();
        makeAutoObservable(this);
    }

    get isLoading() {
        return this._isLoading;
    }

    get isMutating() {
        return this._isMutating;
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

    setMutating = (mutating: boolean) => {
        this._isMutating = mutating;
    };

    clearStore = () => {
        this._isLoading = false;
        this._isMutating = false;
        this._achievements = [];
        this._parentCategories = [];
        this._childCategoriesByParent = {};
    };

    loadUserPageData = async () => {
        this.setLoading(true);
        try {
            const [parents, achievements] = await Promise.all([
                this._categoryReadService.listParents(),
                this._achievementService.listMy(),
            ]);

            runInAction(() => {
                this._parentCategories = parents || [];
                this._achievements = achievements || [];
            });
        } finally {
            runInAction(() => {
                this.setLoading(false);
            });
        }
    };

    reloadAchievements = async () => {
        const achievements = await this._achievementService.listMy();
        runInAction(() => {
            this._achievements = achievements || [];
        });
    };

    ensureChildCategoriesLoaded = async (parentUuid: string) => {
        if (!parentUuid) return;
        if (this._childCategoriesByParent[parentUuid]) return;

        const childs = await this._categoryReadService.listChilds(parentUuid);
        runInAction(() => {
            this._childCategoriesByParent[parentUuid] = childs || [];
        });
    };

    createAchievement = async (payload: UpsertAchievementRequest) => {
        this.setMutating(true);
        try {
            await this._achievementService.create(payload);
            await this.reloadAchievements();
        } finally {
            runInAction(() => {
                this.setMutating(false);
            });
        }
    };

    updateAchievement = async (payload: UpsertAchievementRequest) => {
        this.setMutating(true);
        try {
            await this._achievementService.update(payload);
            await this.reloadAchievements();
        } finally {
            runInAction(() => {
                this.setMutating(false);
            });
        }
    };

    deleteAchievement = async (uuid: string) => {
        this.setMutating(true);
        try {
            await this._achievementService.remove(uuid);
            await this.reloadAchievements();
        } finally {
            runInAction(() => {
                this.setMutating(false);
            });
        }
    };
}

export default AchievementStore;

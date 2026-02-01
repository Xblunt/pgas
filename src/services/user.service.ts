import { AuthStore, UserStore } from "@/stores";
import { AUTH_STORE, USER_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";
import { HttpClient } from "./axios/HttpClient";
import { groupAchievementsByCategory } from "@/utils/achievement";
import { CreateAchievement, SimpleAchievement, UpdateAndViewAchievement, UserAchievement } from "@/models/Achievement";
import { SubCategory } from "@/models/Category";
import { Position } from "@/models/User";

class UserService extends HttpClient {
  private static instance: UserService;
  private _userStore: UserStore;

  constructor() {
    super();
    this._userStore = Injector.get<UserStore>(USER_STORE);
  }

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getAchievements(): Promise<UserAchievement[]> {
    this._userStore.setLoading(true);
    return this.get<SimpleAchievement[]>('/achievement/by_token')
      .then((achievements: SimpleAchievement[]) => {
        const groupedAchievements = groupAchievementsByCategory(achievements);
        
        this._userStore.setAchievements(groupedAchievements);
        
        return groupedAchievements;
      })
      .catch((error: Error) => {
        console.error('Error fetching achievements:', error);
        throw error;
      })
      .finally(() => this._userStore.setLoading(false));
  }

  async getUserPosition(): Promise<Position> {
    this._userStore.setLoading(true);
    return this.get<Position>('/position')
      .then((position: Position) => {
        this._userStore.setPosition(position);
        return position;
      })
      .catch((error: Error) => {
        console.error('Error fetching achievements:', error);
        throw error;
      })
      .finally(() => this._userStore.setLoading(false));
  }

  async getSubcategoriesByParent(parentCategoryUuid: string): Promise<SubCategory[]> {
    return this.get<SubCategory[]>(`/subcategories/${parentCategoryUuid}`)
      .then((subcategories: SubCategory[]) => {
        return subcategories;
      })
      .catch((error: Error) => {
        console.error(`Error fetching subcategories for category ${parentCategoryUuid}:`, error);
        throw error;
      });
  }

  async createAchievement(achievementData: CreateAchievement): Promise<any> {
    return this.post('/achievements/create', achievementData)
      .then((response) => {
        this.getAchievements();
        return response;
      })
      .catch((error: Error) => {
        console.error('Error creating achievement:', error);
        throw error;
      });
  }

  async updateAchievement(achievementUuid: string, achievementData: Partial<CreateAchievement>): Promise<any> {
    return this.put(`/achievements/${achievementUuid}/update`, achievementData)
      .then((response) => {
        this.getAchievements();
        return response;
      })
      .catch((error: Error) => {
        console.error(`Error updating achievement ${achievementUuid}:`, error);
        throw error;
      });
  }

  async saveAchievement(achievementData: CreateAchievement): Promise<any> {
    if (achievementData.uuid) {
      const { uuid, ...dataWithoutUuid } = achievementData;
      return this.updateAchievement(uuid, dataWithoutUuid);
    } else {
      return this.createAchievement(achievementData);
    }
  }

  async deleteAchievement(achievementUuid: string): Promise<any> {
    return this.delete(`/achievements/${achievementUuid}`)
      .then((response) => {
        this.getAchievements();
        return response;
      })
      .catch((error: Error) => {
        console.error(`Error deleting achievement ${achievementUuid}:`, error);
        throw error;
      });
  }
}

export default UserService;
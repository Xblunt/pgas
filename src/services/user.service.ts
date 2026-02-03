import { AuthStore, UserStore } from "@/stores";
import { AUTH_STORE, USER_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";
import { HttpClient } from "./axios/HttpClient";
import { categoriesToUserAchievements, groupAchievementsByCategory } from "@/utils/achievement";
import { CreateAchievement, SimpleAchievement, UpdateAndViewAchievement, UserAchievement } from "@/models/Achievement";
import { SubCategory } from "@/models/Category";
import { Position } from "@/models/User";
import { toRFC3339BirthDate } from "@/utils/date";
import CategoryService from "./category.service";

class UserService extends HttpClient {
  private static instance: UserService;
  private _userStore: UserStore;
  private _categoryService: CategoryService;

  constructor() {
    super();
    this._userStore = Injector.get<UserStore>(USER_STORE);
    this._categoryService = CategoryService.getInstance();
  }

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getAchievements(): Promise<UserAchievement[]> {
      this._userStore.setLoading(true);
      
      try {
          const achievementsResponse = await this.get<any>('/achievement/by_token');
          const achievementsArray = achievementsResponse.data?.data || achievementsResponse.data || [];
          const groupedAchievements = groupAchievementsByCategory(achievementsArray);
          
          const categoriesResponse = await this._categoryService.getCategories();
          const categoriesByUser = categoriesToUserAchievements(categoriesResponse);
          
          let allAchievements: UserAchievement[] = [];
          
          if (groupedAchievements.length === 0) {
              allAchievements = categoriesByUser;
          } else {
              const existingUuids = new Set(
                  groupedAchievements.map(item => item.category_uuid)
              );
              
              allAchievements = [...groupedAchievements];
              
              categoriesByUser.forEach(category => {
                  if (!existingUuids.has(category.category_uuid)) {
                      allAchievements.push(category);
                  }
              });
          }
                  
          this._userStore.setAchievements(allAchievements);
          
          return allAchievements;
          
      } catch (error: any) {
          console.error('Error fetching achievements:', error);
          throw error;
      } finally {
          this._userStore.setLoading(false);
      }
  }


  async getUserPosition(): Promise<Position> {
    this._userStore.setLoading(true);
    return this.get<any>('/rating/short_info')
      .then((position: any) => {
        this._userStore.setPosition(position.data);
        return position.data;
      })
      .catch((error: Error) => {
        console.error('Error fetching achievements:', error);
        throw error;
      })
      .finally(() => this._userStore.setLoading(false));
  }

  async getSubcategoriesByParent(parentCategoryUuid: string): Promise<SubCategory[]> {
    return this.get<any>(`/category/children/${parentCategoryUuid}`)
      .then((subcategories: any) => {
        return subcategories.data;
      })
      .catch((error: Error) => {
        console.error(`Error fetching subcategories for category ${parentCategoryUuid}:`, error);
        throw error;
      });
  }

  async createAchievement(achievementData: CreateAchievement): Promise<any> {
     const params = {
        ...achievementData,
        achievement_date: toRFC3339BirthDate(achievementData.achievement_date)
      }
    return this.post('/achievement', params)
      .then((response) => {
        this.getAchievements();
        return response;
      })
      .catch((error: Error) => {
        console.error('Error creating achievement:', error);
        throw error;
      });
  }

  async updateAchievement(achievementUuid: string, achievementData: CreateAchievement): Promise<any> {
      const params = {
        ...achievementData,
        achievement_date: toRFC3339BirthDate(achievementData.achievement_date)
      }
    return this.put(`/achievement`, params)
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
        const params = {
        ...achievementData,
        achievement_date: toRFC3339BirthDate(achievementData.achievement_date)
      }
   
      return this.updateAchievement(uuid, params);
    } else {
         const { uuid, ...dataWithoutUuid } = achievementData;
         const params = {
        ...dataWithoutUuid,
        achievement_date: toRFC3339BirthDate(achievementData.achievement_date)
      }
      return this.createAchievement(params);
    }
  }

  async deleteAchievement(achievementUuid: string): Promise<any> {
    return this.delete(`/achievement/${achievementUuid}`)
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
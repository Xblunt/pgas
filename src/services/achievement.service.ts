import { HttpClient } from "./axios/HttpClient";
import AchievementStore from "@/stores/achievement.store";
import Injector from "@/utils/injector";
import { ACHIEVEMENT_STORE } from "@/stores/identifiers";
import { SimpleAchievement, UpdateAndViewAchievement, UserAchievement } from "@/models/Achievement";
import { groupAchievementsByCategory } from "@/utils/achievement";

class AchievementService extends HttpClient {
    private static instance: AchievementService;
    private _achivementStore: AchievementStore;

    constructor() {
        super();
        this._achivementStore = Injector.get<AchievementStore>(ACHIEVEMENT_STORE);
    }

    static getInstance(): AchievementService {
      if (!AchievementService.instance) {
        AchievementService.instance = new AchievementService();
      }
      return AchievementService.instance;
    }

    async getAchievementById(achievementUuid: string): Promise<UpdateAndViewAchievement> {
        return this.get<UpdateAndViewAchievement>(`/achievement/${achievementUuid}`)
        .then((achievement: UpdateAndViewAchievement) => {
            return achievement;
        })
        .catch((error: Error) => {
            console.error(`Error fetching achievement ${achievementUuid}:`, error);
            throw error;
        });
    }

    async getAchievementsByUserUuid(uuid: string): Promise<UserAchievement[]> {
        return this.get<SimpleAchievement[]>(`/achievement/by_user_uuid/${uuid}`)
        .then((achievements: SimpleAchievement[]) => {
            const groupedAchievements = groupAchievementsByCategory(achievements);
            return groupedAchievements;
        })
        .catch((error: Error) => {
            console.error('Error fetching achievements:', error);
            throw error;
        });
    }
    
    async approveAchievement(achievementUuid: string): Promise<any> {
        return this.get(`achievements/approve/${achievementUuid}`)
        .then((response) => {
            return response;
        })
        .catch((error: Error) => {
            console.error(`Error approve achievement ${achievementUuid}:`, error);
            throw error;
        });
    }

    async rejecteAchievement(achievementUuid: string): Promise<any> {
        return this.get(`/achievements/decline/${achievementUuid}`)
        .then((response) => {
            return response;
        })
        .catch((error: Error) => {
            console.error(`Error decline achievement ${achievementUuid}:`, error);
            throw error;
        });
    }
    
}

export default AchievementService;
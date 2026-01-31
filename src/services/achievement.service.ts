import { HttpClient } from "./axios/HttpClient";

export type ApiResponse<T> = {
    data: T;
    pagination?: {
        total_records: number;
        limit: number;
        offset: number;
        selected: number;
    };
};

export type ApiSimpleAchievement = {
    uuid: string;
    comment: string;
    status: string;
    category_name: string;
    point_amount: number;
    attachment_link: string;
};

export type UpsertAchievementRequest = {
    uuid?: string;
    attachment_link: string;
    comment: string;
    category_uuids: string[];
};

class AchievementService extends HttpClient {
    async listMy(): Promise<ApiSimpleAchievement[]> {
        const resp = await this.get<ApiResponse<ApiSimpleAchievement[]>>("/achievement/by_token");
        return resp?.data || [];
    }

    async create(payload: UpsertAchievementRequest): Promise<{ uuid: string }> {
        const resp = await this.post<ApiResponse<{ uuid: string }>>("/achievement", payload);
        return resp.data;
    }

    async update(payload: UpsertAchievementRequest): Promise<string> {
        const resp = await this.put<ApiResponse<string>>("/achievement", payload);
        return resp.data;
    }

    async remove(uuid: string): Promise<string> {
        const resp = await this.delete<ApiResponse<string>>(`/achievement/${uuid}`);
        return resp.data;
    }
}

export default AchievementService;

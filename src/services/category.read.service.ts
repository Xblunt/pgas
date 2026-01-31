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

export type ApiCategory = {
    uuid: string;
    name: string;
    comment?: string;
    parent_category?: string | null;
    point_amount?: number;
    display_value?: string;
};

class CategoryReadService extends HttpClient {
    async listParents(): Promise<ApiCategory[]> {
        const resp = await this.get<ApiResponse<ApiCategory[]>>("/category/parent");
        return resp?.data || [];
    }

    async listChilds(parentUuid: string): Promise<ApiCategory[]> {
        const resp = await this.get<ApiResponse<ApiCategory[]>>(`/category/childs/${parentUuid}`);
        return resp?.data || [];
    }
}

export default CategoryReadService;

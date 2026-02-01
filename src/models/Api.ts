export type ApiResponse<T> = {
    data: T;
    pagination?: {
        total_records: number;
        limit: number;
        offset: number;
        selected: number;
    };
};


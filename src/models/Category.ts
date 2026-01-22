export interface CreateCategory {
  name: string;
  comment: string;
  parent_uuid: string;
  point_amount: number;
}

export interface UpdateCategory {
  uuid: string;
  name: string;
  comment: string;
  parent_uuid: string;
  point_amount: number;
  status: string;
}

export interface CreateCategoryResponse {
  uuid: string;
}

export interface Category {
  uuid: string;
  name: string;
  points?: number;
}
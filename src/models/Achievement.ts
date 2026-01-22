import { Category } from "./Category";

export interface UpsertAchievement {
  uuid: string;
  attachment_link: string;
  comment: string;
  category_uuids: string[];
}

export interface Achievement {
  uuid: string;
  comment: string;
  status: string;
  categories: Category[];
  point_amount: number;
  attachment_link: string;
}

export interface SimpleAchievement {
  uuid: string;
  comment: string;
  status: string;
  category_name: string;
  point_amount: number;
  attachment_link: string;
}
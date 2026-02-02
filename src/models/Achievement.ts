import { Category } from "./Category";

export type SimpleAchievement = {
    uuid: string;
    attachment_link: string;
    category_uuid: string;
    status: string;
    category_name: string;
    point_amount: number;
    comment: string;
};

export interface AchievementSubCategoriesValue {
    uuid: string;
    selected_value: string;
}

export interface CreateAchievement {
    uuid?: string;
    name: string;
    comment?: string;
    attachment_link: string;
    category_uuid: string;
    category_name: string;
    achievement_date: string;
    subcategories: AchievementSubCategoriesValue[];
};


export interface AchievementSubCategoriesViewValue {
    uuid: string;
    name: string;
    selected_value: string;
    available_values: string[];
    points: number;
}

export interface UpdateAndViewAchievement {
    uuid: string;
    comment?: string;
    attachment_link: string;
    category: Category;
    status?: string;
    achievement_date: string;
    subcategories: AchievementSubCategoriesViewValue[];
};

export interface UserAchievement {
    category_name: string;
    category_uuid: string;
    achievementQuantity: number;
    achievements: SimpleAchievement[];
}

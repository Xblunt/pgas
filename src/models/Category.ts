import { ScoreItem } from "./types";

export interface Category {
    uuid?: string;
    name: string;
    points: number;
}

export interface SubCategory {
    uuid?: string;
    name: string;
    points?: number;
    values: ScoreItem[];
}
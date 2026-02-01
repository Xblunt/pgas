import { User } from '@/models/User';

export enum ButtonVariant {
    PRIMARY = "primary",
    OUTLINE = "outline"
}

export enum ButtonSize {
    SAMLL = "small",
    MEDIUM = "medium"
}

export enum ButtonType {
    BUTTON = "button",
    SUBMIT = "submit",
    RESET = "reset"
}

export interface ButtonAction {
    text: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: () => void;
    type?: ButtonType;
    disabled?: boolean;
    icon?: string;

    excelData?: User[];
    excelFileName?: string;
    exportToExcel?: boolean;
    onExportStart?: () => void;
    onExportComplete?: (fileName: string) => void;
    onExportError?: (error: string) => void;
}

export type DropdownBlockItem = {
    uuid: string;
    title: string;
    subtitle?: string;
    points: number;
    tags: string[];
};

export interface ScoreItem {
    name: string;
    points: number;
}

export type AchievementFormState = {
    category: string;
    subcategory: string;
    place: string;
    participants: number;
    preliminaryPoints: number;
    actualPoints: number;
    status: string;
    publicationDate: string;
    file: File | null;
    fileName: string;
    link: string;
    description: string;
};

export interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'error';
  duration?: number;
}

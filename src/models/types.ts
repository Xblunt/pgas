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
    onClick: () => void;
    type?: ButtonType;
    disabled?: boolean;
    icon?: string;
}

export type DropdownBlockItem = {
    uuid: string;
    title: string;
    subtitle: string;
    points: number;
    tags: string[];
};

export interface ScoreItem {
    name: string;
    points: number;
}

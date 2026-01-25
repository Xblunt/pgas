"use client";

import React from "react";
import {
    AccordionGroup,
    GroupHeader,
    GroupHeaderText,
    HeaderTitle,
    HeaderSubtitle,
    GroupActions,
    SquareButton,
    CountBox,
    ChevronButton,
    GroupBody,
    AchievementRow,
    AchievementIndex,
    AchievementMain,
    AchievementTitle,
    AchievementSubtitle,
    AchievementRight,
    PointsChip,
    TagChip,
    IconActions,
} from "./DropdownBlock.styles";
import { IconButton } from "@/components/buttons";

export type DropdownBlockItem = {
    id: string;
    title: string;
    subtitle: string;
    points: number;
    tags: string[];
};

export interface DropdownBlockProps {
    title: string;
    subtitle: string;
    isOpen: boolean;
    items: DropdownBlockItem[];
    onToggle: () => void;
    onAdd: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const chevronUpIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 14L12 8L18 14" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const chevronDownIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 10L12 16L18 10" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const editIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 20H21" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const trashIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 6h18" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 6V4h8v2" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 6l-1 14H6L5 6" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 11v6" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 11v6" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const DropdownBlock: React.FC<DropdownBlockProps> = (props) => {
    const count = props.items.length;

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.onAdd();
    };

    const handleChevron = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.onToggle();
    };

    return (
        <AccordionGroup>
            <GroupHeader onClick={props.onToggle}>
                <GroupHeaderText>
                    <HeaderTitle>{props.title}</HeaderTitle>
                    <HeaderSubtitle>{props.subtitle}</HeaderSubtitle>
                </GroupHeaderText>

                <GroupActions>
                    <SquareButton variant="outline" size="small" onClick={handleAdd}>
                        +
                    </SquareButton>

                    <CountBox>{count}</CountBox>

                    <ChevronButton type="button" onClick={handleChevron}>
            <span
                dangerouslySetInnerHTML={{
                    __html: props.isOpen ? chevronUpIcon : chevronDownIcon,
                }}
            />
                    </ChevronButton>
                </GroupActions>
            </GroupHeader>

            {props.isOpen && (
                <GroupBody>
                    {props.items.map((item, index) => (
                        <AchievementRow key={item.id}>
                            <AchievementIndex>{index + 1}</AchievementIndex>

                            <AchievementMain>
                                <AchievementTitle>{item.title}</AchievementTitle>
                                <AchievementSubtitle>{item.subtitle}</AchievementSubtitle>
                            </AchievementMain>

                            <AchievementRight>
                                <PointsChip>{item.points}б</PointsChip>

                                {item.tags.slice(0, 2).map((t, i) => (
                                    <TagChip key={`${item.id}-tag-${i}`}>{t}</TagChip>
                                ))}

                                <IconActions>
                                    <IconButton icon={editIcon} size={26} onClick={() => props.onEdit(item.id)} />
                                    <IconButton icon={trashIcon} size={26} onClick={() => props.onDelete(item.id)} />
                                </IconActions>
                            </AchievementRight>
                        </AchievementRow>
                    ))}
                </GroupBody>
            )}
        </AccordionGroup>
    );
};

export default DropdownBlock;

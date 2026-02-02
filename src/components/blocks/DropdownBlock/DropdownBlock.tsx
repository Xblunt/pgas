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
    AchievementContent,
    TagsContainer,
    LoaderContainer,
    LoaderSpinner,
} from "./DropdownBlock.styles";
import { IconButton } from "@/components/buttons";
import { ButtonSize, DropdownBlockItem } from "@/models/types";

export interface DropdownBlockProps {
    title: string;
    uuid: string;
    subtitle?: string;
    isOpen: boolean;
    items: DropdownBlockItem[];
    onToggle?: () => void;
    onAdd?: () => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onParentEdit?: (id: string) => void;
    onParentDelete?: (id: string) => void;
    readonly?: boolean;
    onView?: (id: string) => void;
    loadingUuid?: string | null;
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

const menuIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 6H20" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 12H20" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 18H20" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const DropdownBlock: React.FC<DropdownBlockProps> = (props) => {
    const count = props.items.length;
    const isLoading = props.loadingUuid === props.uuid;

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!props.onAdd) return;
        e.stopPropagation();
        props.onAdd();
    };

    const handleChevron = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!props.onToggle) return;
        e.stopPropagation();
        props.onToggle();
    };

    const handleToggle = () => {
        if (props.items.length <= 0 && !props.readonly && props.onAdd) {
            props.onAdd();
            return;
        }

        if (!props.onToggle || props.items.length <= 0) return;
        props.onToggle();
    };

    return (
        <AccordionGroup>
            <GroupHeader onClick={handleToggle}>
                <GroupHeaderText>
                    <HeaderTitle>{props.title}</HeaderTitle>
                    {props.subtitle && <HeaderSubtitle>{props.subtitle}</HeaderSubtitle>}
                </GroupHeaderText>

                <CountBox>{count}</CountBox>

                <GroupActions>
                    {!props.readonly && (
                        <IconActions>
                            <SquareButton size={ButtonSize.SAMLL} onClick={handleAdd}>
                                +
                            </SquareButton>

                            <IconButton icon={editIcon} size={26} onClick={() => props.onParentEdit && props.onParentEdit(props.uuid)} />
                            <IconButton icon={trashIcon} size={26} onClick={() => props.onParentDelete && props.onParentDelete(props.uuid)} />
                        </IconActions>
                    )}

                    {props.items.length > 0 && (
                        <ChevronButton type="button" onClick={handleChevron}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: props.isOpen ? chevronUpIcon : chevronDownIcon,
                                }}
                            />
                        </ChevronButton>
                    )}
                </GroupActions>
            </GroupHeader>

            {props.isOpen && (
                <GroupBody>
                    {isLoading ? (
                        <LoaderContainer>
                            <LoaderSpinner />
                        </LoaderContainer>
                    ) : (
                        props.items.map((item, index) => (
                            <AchievementRow key={item.uuid}>
                                <AchievementIndex>{index + 1}</AchievementIndex>

                                <AchievementContent>
                                    <AchievementMain>
                                        <AchievementTitle>{item.title}</AchievementTitle>
                                        <AchievementSubtitle>{item.subtitle}</AchievementSubtitle>
                                    </AchievementMain>

                                    <AchievementRight>
                                        <PointsChip>{item.points}б</PointsChip>

                                        <TagsContainer>
                                            {item.tags.slice(0, 2).map((t, i) => (
                                                <TagChip key={`${item.uuid}-tag-${i}`}>{t}</TagChip>
                                            ))}
                                        </TagsContainer>

                                        <IconActions>
                                            {props.readonly ? (
                                                <IconButton icon={menuIcon} size={26} onClick={() => props.onView && props.onView(item.uuid)} />
                                            ) : (
                                                <>
                                                    <IconButton icon={editIcon} size={26} onClick={() => props.onEdit && props.onEdit(item.uuid)} />
                                                    <IconButton icon={trashIcon} size={26} onClick={() => props.onDelete && props.onDelete(item.uuid)} />
                                                </>
                                            )}
                                        </IconActions>
                                    </AchievementRight>
                                </AchievementContent>
                            </AchievementRow>
                        ))
                    )}
                </GroupBody>
            )}
        </AccordionGroup>
    );
};

export default DropdownBlock;
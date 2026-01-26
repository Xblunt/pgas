"use client";

import React from "react";
import { DefaultButton, IconButton } from "@/components/buttons";
import {
    BlockContainer,
    BlockContent,
    NumberBox,
    InfoText,
    InfoPrimary,
    InfoSecondary,
    BlockActions,
    BlockTitle,
    BlockWrapper
} from "./DefaultBlock.styles";
import { ButtonAction, ButtonSize, ButtonVariant } from "@/models/types";

const checkIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2"/>
        <path d="M8 12L11 15L16 9" stroke="var(--color-white)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;

const crossIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2"/>
        <path d="M9 9L15 15M15 9L9 15" stroke="var(--color-white)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;

export interface DefaultBlockProps {
    number: number;
    primaryText: string;
    secondaryText?: string;
    title?: string;
    actions?: ButtonAction[];
    onClick?: () => void;
}

const DefaultBlock: React.FC<DefaultBlockProps> = (props) => {
    const handleClick = (e: React.MouseEvent) => {
        if (!props.onClick) return;
        e.stopPropagation();
        props.onClick();
    };

    return (
        <BlockWrapper>
            {props.title && <BlockTitle>{props.title}</BlockTitle>}
            <BlockContainer $clickable={!!props.onClick} onClick={handleClick}>
                <BlockContent>
                    <NumberBox>{props.number}</NumberBox>
                    <InfoText>
                        <InfoPrimary>{props.primaryText}</InfoPrimary>
                        {props.secondaryText && <InfoSecondary>{props.secondaryText}</InfoSecondary>}
                    </InfoText>
                </BlockContent>
                
                {props.actions && props.actions.length > 0 && (
                    <BlockActions>
                        {props.actions.map((action, index) => {
                            if (action.icon) {
                                const iconSvg = action.icon === "check" ? checkIcon : 
                                               action.icon === "cross" ? crossIcon : 
                                               action.icon;
                                
                                return (
                                    <IconButton
                                        key={index}
                                        icon={iconSvg}
                                        size={40}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            action.onClick();
                                        }}
                                    />
                                );
                            }
                            
                            return (
                                <DefaultButton
                                    key={index}
                                    variant={action.variant || ButtonVariant.OUTLINE}
                                    size={action.size || ButtonSize.MEDIUM}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        action.onClick();
                                    }}
                                >
                                    {action.text}
                                </DefaultButton>
                            );
                        })}
                    </BlockActions>
                )}
            </BlockContainer>
        </BlockWrapper>
    );
};

export default DefaultBlock;
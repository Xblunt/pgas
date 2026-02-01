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
    BlockWrapper,
    TagsContainer,
    TagChip
} from "./DefaultBlock.styles";
import { ButtonAction, ButtonSize, ButtonVariant } from "@/models/types";

const checkIcon = `
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 384.97 384.97" style="enable-background:new 0 0 384.97 384.97;" xml:space="preserve"><g><g id="Check_Circle"><path d="M192.485,0C86.173,0,0,86.173,0,192.485S86.173,384.97,192.485,384.97c106.3,0,192.485-86.185,192.485-192.485 C384.97,86.173,298.785,0,192.485,0z M192.485,360.909c-93.018,0-168.424-75.406-168.424-168.424S99.467,24.061,192.485,24.061 s168.424,75.406,168.424,168.424S285.503,360.909,192.485,360.909z"></path><path d="M280.306,125.031L156.538,247.692l-51.502-50.479c-4.74-4.704-12.439-4.704-17.179,0c-4.752,4.704-4.752,12.319,0,17.011 l60.139,58.936c4.932,4.343,12.307,4.824,17.179,0l132.321-131.118c4.74-4.692,4.74-12.319,0-17.011 C292.745,120.339,285.058,120.339,280.306,125.031z"></path></g></g></svg>`;

const crossIcon = `
    <svg id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><g id="layer2_00000140014110150884852820000003059239864700069044_" transform="translate(-261 -1)"><g id="g21511" transform="translate(260)"><path id="circle19227" d="m257 1c-141.183 0-256 114.817-256 256s114.817 256 256 256 256-114.817 256-256-114.817-256-256-256zm0 34.133c122.736 0 221.867 99.131 221.867 221.867s-99.131 221.867-221.867 221.867-221.867-99.131-221.867-221.867 99.131-221.867 221.867-221.867z"></path><path id="path19229" d="m142.533 142.533c-6.663 6.665-6.663 17.469 0 24.133l90.334 90.334-90.333 90.333c-6.663 6.665-6.663 17.469 0 24.133 6.665 6.663 17.469 6.663 24.133 0l90.333-90.333 90.333 90.333c6.665 6.663 17.469 6.663 24.133 0 6.663-6.665 6.663-17.469 0-24.133l-90.333-90.333 90.333-90.333c6.663-6.665 6.663-17.469 0-24.133-6.665-6.663-17.469-6.663-24.133 0l-90.333 90.333-90.333-90.333c-7.28-7.311-17.367-5.791-24.134-.001z"></path></g></g></g></svg>
`;

export interface DefaultBlockProps {
    number: number;
    primaryText: string;
    secondaryText?: string;
    title?: string;
    actions?: ButtonAction[];
    onClick?: () => void;
    tags?: string[];
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
                        
                        {props.tags && props.tags.length > 0 && (
                            <TagsContainer>
                                {props.tags.slice(0, 3).map((tag, index) => (
                                    <TagChip key={`tag-${index}`}>{tag}</TagChip>
                                ))}
                                {props.tags.length > 3 && (
                                    <TagChip>+{props.tags.length - 3}</TagChip>
                                )}
                            </TagsContainer>
                        )}
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
                                            action.onClick && action.onClick();
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
                                        action.onClick && action.onClick();
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
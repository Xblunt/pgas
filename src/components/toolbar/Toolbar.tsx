"use client";

import React from "react";
import { DefaultButton } from "@/components/buttons";
import { 
    ToolbarContainer, 
    ToolbarTitle as Title, 
    ToolbarActions as Actions 
} from "./Toolbar.styles";
import { ButtonAction, ButtonSize } from "@/models/types";

export interface ToolbarProps {
    title?: string;
    buttons?: ButtonAction[];
    children?: React.ReactNode;
}

const Toolbar: React.FC<ToolbarProps> = ({ title, buttons, children }) => {
    return (
        <ToolbarContainer>
            <Title>{title || ""}</Title>
            
            <Actions>
                {children}
                
                {buttons && buttons.map((button, index) => (
                    <DefaultButton
                        key={index}
                        variant={button.variant}
                        size={button.size || ButtonSize.MEDIUM}
                        onClick={button.onClick}
                        disabled={button.disabled}
                    >
                        {button.text}
                    </DefaultButton>
                ))}
            </Actions>
        </ToolbarContainer>
    );
};

export default Toolbar;
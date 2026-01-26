import React from "react";
import { StyledButton } from "./DefaultButton.styles";
import { ButtonSize, ButtonType, ButtonVariant } from "@/models/types";

export interface DefaultButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: ButtonType;
}

const DefaultButton: React.FC<DefaultButtonProps> = (props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.disabled || !props.onClick) return;
    props.onClick(e);
  };

  return (
      <StyledButton
          $variant={props.variant || ButtonVariant.PRIMARY}
          $size={props.size || ButtonSize.MEDIUM}
          $fullWidth={!!props.fullWidth}
          className={props.className}
          onClick={handleClick}
          disabled={props.disabled}
          type={props.type || ButtonType.BUTTON}
      >
        {props.children}
      </StyledButton>
  );
};

export default DefaultButton;

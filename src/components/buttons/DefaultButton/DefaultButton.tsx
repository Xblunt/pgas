import React from "react";
import { StyledButton } from "./DefaultButton.styles";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "small" | "medium";

export interface DefaultButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const DefaultButton: React.FC<DefaultButtonProps> = (props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.disabled || !props.onClick) return;
    props.onClick(e);
  };

  return (
      <StyledButton
          $variant={props.variant || "primary"}
          $size={props.size || "medium"}
          $fullWidth={!!props.fullWidth}
          className={props.className}
          onClick={handleClick}
          disabled={props.disabled}
          type={props.type || "button"}
      >
        {props.children}
      </StyledButton>
  );
};

export default DefaultButton;

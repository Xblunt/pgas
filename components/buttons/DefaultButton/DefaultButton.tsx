import React from 'react';
import { StyledButton } from './DefaultButton.styles';

type ButtonVariant = 'primary' | 'outline';
type ButtonSize = 'small' | 'medium';

export interface DefaultButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const DefaultButton: React.FC<DefaultButtonProps> = (props) => {
  const handleClick = () => {
    if (props.disabled || !props.onClick) return;
    props.onClick();
  };

  return (
    <StyledButton
      $variant={props.variant || 'primary'}
      $size={props.size || 'medium'}
      $fullWidth={!!props.fullWidth}
      className={props.className}
      onClick={handleClick}
      disabled={props.disabled}
      type={props.type || 'button'}
    >
      {props.children}
    </StyledButton>
  );
};
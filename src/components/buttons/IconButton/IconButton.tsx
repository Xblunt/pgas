import React from 'react';
import { StyledIconButton, IconContainer } from './IconButton.styles';

export interface IconButtonProps {
  icon: string;
  size?: number;
  className?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const handleClick = (e: any) => {
    if (props.disabled || !props.onClick) return;
    props.onClick(e);
  };

  return (
    <StyledIconButton
      $size={props.size || 50}
      className={props.className}
      onClick={handleClick}
      disabled={props.disabled}
    >
      <IconContainer 
        dangerouslySetInnerHTML={{ __html: props.icon }}
        $size={props.size || 50}
      />
    </StyledIconButton>
  );
};

export default IconButton;
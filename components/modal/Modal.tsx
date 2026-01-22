import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalButton
} from './Modal.styles';
import { DefaultButton } from '../buttons/DefaultButton/DefaultButton';
import { IconButton } from '../buttons/IconButton/IconButton';


export interface ModalButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  buttons?: ModalButtonProps[];
  showCloseButton?: boolean;
  fullWidth?: boolean;
  maxWidth?: number;
  className?: string;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const closeIcon = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  if (!props.isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer 
        $fullWidth={!!props.fullWidth} 
        $maxWidth={props.maxWidth}
        className={props.className}
      >
        {(props.title || props.showCloseButton) && (
          <ModalHeader>
            {props.title && <ModalTitle>{props.title}</ModalTitle>}
            {props.showCloseButton && (
              <ModalCloseButton>
                <IconButton icon={closeIcon} onClick={props.onClose} size={24} />
              </ModalCloseButton>
            )}
          </ModalHeader>
        )}
        
        <ModalContent>
          {props.children}
        </ModalContent>
        
        {props.buttons && props.buttons.length > 0 && (
          <ModalFooter>
            {props.buttons.map((button, index) => (
              <ModalButton key={index}>
                <DefaultButton
                  variant={button.variant || 'primary'}
                  onClick={button.onClick}
                  disabled={button.disabled}
                  fullWidth
                >
                  {button.text}
                </DefaultButton>
              </ModalButton>
            ))}
          </ModalFooter>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};
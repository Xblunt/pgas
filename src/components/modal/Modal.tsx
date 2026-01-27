import React, { useEffect } from 'react';
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
import { IconButton, DefaultButton } from '../buttons';
import { ButtonAction, ButtonVariant } from '@/models/types';

export interface ModalProps {
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  buttons?: ButtonAction[];
  fullWidth?: boolean;
  maxWidth?: number;
  className?: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const closeIcon = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget &&  props.onClose) {
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
        {(props.title || props.onClose) && (
          <ModalHeader>
            {props.title && <ModalTitle>{props.title}</ModalTitle>}
            {props.onClose && (
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
                  variant={button.variant || ButtonVariant.PRIMARY}
                  onClick={button.onClick}
                  disabled={button.disabled}
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

export default Modal;
import React, { useEffect, useState, useRef } from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalButton,
  LoaderContainer
} from './Modal.styles';
import { IconButton, DefaultButton } from '../buttons';
import { ButtonAction, ButtonVariant } from '@/models/types';
import Loader from '../loader';

export interface ModalProps {
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  buttons?: ButtonAction[];
  fullWidth?: boolean;
  maxWidth?: number;
  className?: string;
  loading?: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
  const closeIcon = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const [isMouseDownOnOverlay, setIsMouseDownOnOverlay] = useState<boolean>(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsMouseDownOnOverlay(true);
    }
  };

  const handleOverlayMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDownOnOverlay && e.target === e.currentTarget && props.onClose) {
      props.onClose();
    }
    setIsMouseDownOnOverlay(false);
  };

  const handleModalContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.onClose) {
        props.onClose();
      }
    };

    if (props.onClose) {
      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [props.onClose]);

  return (
    <ModalOverlay 
      onMouseDown={handleOverlayMouseDown}
      onMouseUp={handleOverlayMouseUp}
    >
      <ModalContainer 
        ref={modalContainerRef}
        $fullWidth={!!props.fullWidth} 
        $maxWidth={props.maxWidth}
        className={props.className}
        onMouseDown={handleModalContainerMouseDown}
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
          {props.loading ? (
            <LoaderContainer>
              <Loader inContetnt={true} />
            </LoaderContainer>
          ) : (
            props.children
          )}
        </ModalContent>
        
        {props.buttons && props.buttons.length > 0 && (
          <ModalFooter $loading={props.loading}>
            {props.buttons.map((button, index) => (
              <ModalButton key={index}>
                <DefaultButton
                  variant={button.variant || ButtonVariant.PRIMARY}
                  onClick={button.onClick}
                  disabled={button.disabled || props.loading}
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
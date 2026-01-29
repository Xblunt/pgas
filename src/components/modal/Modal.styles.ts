import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContainer = styled.div<{
  $fullWidth: boolean;
  $maxWidth?: number;
}>`
  background: var(--color-white);
  border: 2px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  min-height: 200px; /* Минимальная высота для лоадера */
  overflow: hidden;
  border-radius: 12px;
  
  ${props => css`
    width: ${props.$fullWidth ? '100%' : 'auto'};
    max-width: ${props.$maxWidth ? `${props.$maxWidth}px` : '500px'};
  `}
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(38, 48, 69, 0.1);
  min-height: 60px;
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  font-family: var(--fontfamily);
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
`;

export const ModalCloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
  min-height: 100px; /* Минимальная высота контента */
  color: var(--color-primary);
  font-family: var(--fontfamily);
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;

export const ModalFooter = styled.div<{ $loading?: boolean }>`
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid rgba(38, 48, 69, 0.1);
  justify-content: flex-end;
  flex-shrink: 0;
  
  ${props => props.$loading && css`
    opacity: 0.6;
    pointer-events: none;
  `}
`;

export const ModalButton = styled.div`
  min-width: fit-content;
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 100px;
`;

export const ContentLoaderCircle = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  
  &:after {
    content: " ";
    display: block;
    width: 32px;
    height: 32px;
    margin: 4px;
    border-radius: 50%;
    border: 3px solid var(--color-primary);
    border-color: var(--color-primary) transparent var(--color-primary) transparent;
    animation: ${spin} 1.2s linear infinite;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    
    &:after {
      width: 26px;
      height: 26px;
    }
  }
`;
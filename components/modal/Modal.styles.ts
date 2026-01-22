import styled, { css } from 'styled-components';

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
  overflow: hidden;
  
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
  color: var(--color-primary);
  font-family: var(--fontfamily);
  font-size: 16px;
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid rgba(38, 48, 69, 0.1);
`;

export const ModalButton = styled.div`
  flex: 1;
`;
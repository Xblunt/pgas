import styled, { css, keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const Toast = styled.div<{ $type: 'success' | 'error' }>`
  background: var(--color-white);
  border: 2px solid;
  border-radius: 8px;
  padding: 16px 20px;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  animation: ${slideIn} 0.3s ease-out forwards;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &.exiting {
    animation: ${slideOut} 0.3s ease-out forwards;
  }

  ${props => props.$type === 'error' && css`
    border-color: #ff4444;
    background: #fff5f5;
  `}

  ${props => props.$type === 'success' && css`
    border-color: #00c851;
    background: #f5fff9;
  `}

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
    max-width: 100%;
    padding: 14px 16px;
  }
`;

export const ToastContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ToastIcon = styled.div<{ $type: 'success' | 'error' }>`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.$type === 'error' && css`
    color: #ff4444;
  `}

  ${props => props.$type === 'success' && css`
    color: #00c851;
  `}
`;

export const ToastMessage = styled.div`
  font-family: var(--fontfamily);
  font-size: 14px;
  color: var(--color-primary);
  line-height: 1.4;
`;

export const ToastClose = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;
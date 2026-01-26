import { ButtonSize, ButtonVariant } from '@/models/types';
import styled, { css } from 'styled-components';

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: var(--fontfamily);
  font-weight: 500;
  transition: opacity 0.2s ease, background-color 0.2s ease;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  height: 40px;

  ${props => props.$fullWidth && css`
    width: 100%;
  `}

  ${props => props.$size === 'small' && css`
    width: 40px;
    min-width: 40px;
    font-size: 14px;
  `}

  ${props => props.$size === 'medium' && css`
    padding: 0 16px;
    font-size: 16px;
    
    ${!props.$fullWidth && css`
      width: auto;
    `}
  `}

  ${props => props.$variant === 'primary' && css`
    background: var(--color-primary);
    color: var(--color-white);
    border: none;
  `}

  ${props => props.$variant === 'outline' && css`
    background: var(--color-white);
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    
    &:hover {
      background-color: var(--color-toned);
    }
  `}

  &:hover {
    ${props => props.$variant === 'primary' && css`
      opacity: 0.8;
    `}
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
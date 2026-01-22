import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'outline';
type ButtonSize = 'small' | 'medium';

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
  transition: opacity 0.2s ease;
  position: relative;
  overflow: hidden;

  ${props => props.$fullWidth && css`
    width: 100%;
  `}

  ${props => props.$size === 'small' && css`
    width: 50px;
    height: 50px;
    font-size: 14px;
  `}

  ${props => props.$size === 'medium' && css`
    width: 150px;
    height: 50px;
    font-size: 16px;
  `}

  ${props => props.$variant === 'primary' && css`
    background: var(--color-primary);
    color: var(--color-white);
    border: none;
  `}

  ${props => props.$variant === 'outline' && css`
    background: var(--color-white);
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  `}

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
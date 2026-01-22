import styled, { css } from 'styled-components';

export const StyledIconButton = styled.button<{
  $size: number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  padding: 0;
  transition: opacity 0.2s ease;
  
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  min-width: ${props => props.$size}px;
  min-height: ${props => props.$size}px;

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

export const IconContainer = styled.div<{
  $size: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  svg {
    width: ${props => props.$size * 0.6}px;
    height: ${props => props.$size * 0.6}px;
    display: block;
    
    path, circle, rect, line, polyline, polygon {
      fill: var(--color-primary);
    }
  }
`;
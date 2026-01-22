import styled, { css } from 'styled-components';

export const InputWrapper = styled.div<{
  $fullWidth: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
`;

export const InputLabel = styled.label<{
  $hasError: boolean;
}>`
  font-family: var(--fontfamily);
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$hasError ? '#ff4444' : 'var(--color-primary)'};
`;

export const ControlsContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledNumberInput = styled.input<{
  $hasError: boolean;
  $fullWidth: boolean;
}>`
  font-family: var(--fontfamily);
  font-size: 16px;
  padding: 12px 40px;
  border: 2px solid;
  border-color: ${props => props.$hasError ? '#ff4444' : 'var(--color-primary)'};
  border-radius: 0;
  outline: none;
  background: var(--color-white);
  color: var(--color-primary);
  transition: all 0.2s ease;
  width: 100%;
  -moz-appearance: textfield;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &::placeholder {
    color: rgba(38, 48, 69, 0.5);
  }
  
  &:focus {
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ControlButton = styled.button<{
  $position: 'left' | 'right';
}>`
  position: absolute;
  top: 0;
  ${props => props.$position === 'left' ? 'left: 0;' : 'right: 0;'}
  height: 100%;
  width: 40px;
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-family: var(--fontfamily);
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.6;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  font-family: var(--fontfamily);
  font-size: 12px;
  color: #ff4444;
  margin-top: 2px;
`;
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

export const DropdownContainer = styled.div<{
  $isOpen: boolean;
  $hasError: boolean;
  $disabled: boolean;
  $fullWidth: boolean;
}>`
  position: relative;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  ${props => props.$hasError && css`
    border: 2px solid #ff4444;
  `}
`;

export const SelectedValue = styled.div<{
  $hasValue: boolean;
  $disabled: boolean;
}>`
  font-family: var(--fontfamily);
  font-size: 16px;
  padding: 12px 16px;
  padding-right: 40px;
  border: 2px solid var(--color-primary);
  background: var(--color-white);
  color: ${props => props.$hasValue ? 'var(--color-primary)' : 'rgba(38, 48, 69, 0.5)'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: ${props => props.$disabled ? 1 : 0.8};
  }
`;

export const DropdownIcon = styled.div<{
  $isOpen: boolean;
  $disabled: boolean;
}>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: ${props => props.$isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'};
  font-size: 12px;
  color: var(--color-primary);
  pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: ${props => props.$disabled ? 0.5 : 1};
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: var(--color-white);
  border: 2px solid var(--color-primary);
  border-top: none;
  z-index: 1000;
  margin-top: -2px;
`;

export const DropdownItem = styled.div<{
  $isSelected: boolean;
}>`
  font-family: var(--fontfamily);
  font-size: 16px;
  padding: 12px 16px;
  background: ${props => props.$isSelected ? 'rgba(38, 48, 69, 0.1)' : 'var(--color-white)'};
  color: var(--color-primary);
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(38, 48, 69, 0.1);
  }
`;

export const ErrorText = styled.span`
  font-family: var(--fontfamily);
  font-size: 12px;
  color: #ff4444;
  margin-top: 2px;
`;
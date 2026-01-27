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
  color: ${props => props.$hasError ? 'var(--error)' : 'var(--color-primary)'};
`;

export const StyledInput = styled.input<{
  $hasError: boolean;
  $fullWidth: boolean;
}>`
  font-family: var(--fontfamily);
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid;
  border-color: ${props => props.$hasError ? 'var(--error)' : 'var(--color-primary)'};
  border-radius: 6px;
  outline: none;
  background: var(--color-white);
  color: var(--color-primary);
  transition: all 0.2s ease;
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
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

export const ErrorText = styled.span`
  font-family: var(--fontfamily);
  font-size: 12px;
  color: var(--error);
  margin-top: 2px;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-primary);
  padding: 0;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChangePasswordLink = styled.button<{
  disabled?: boolean;
}>`
  font-family: var(--fontfamily);
  font-size: 12px;
  color: ${props => props.disabled ? 'var(--color-primary-disabled)' : 'var(--color-blue)'};
  background: none;
  border: none;
  text-align: left;
  padding: 0;
  margin-top: 2px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    text-decoration: ${props => props.disabled ? 'none' : 'underline'};
    opacity: ${props => props.disabled ? 1 : 0.8};
  }
  
  &:active {
    opacity: ${props => props.disabled ? 1 : 0.6};
  }
`;
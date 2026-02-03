import styled, { css } from 'styled-components';

export const TextAreaWrapper = styled.div<{
  $fullWidth: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 12px;
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
`;

export const TextAreaLabel = styled.label<{
  $hasError: boolean;
  $disabled?: boolean;
}>`
  font-family: var(--fontfamily);
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$hasError ? 'var(--error)' : (props.$disabled ? 'rgba(38, 48, 69, 0.5)' : 'var(--color-primary)')};
`;

export const StyledTextArea = styled.textarea<{
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
  resize: vertical;
  min-height: 80px;
  
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
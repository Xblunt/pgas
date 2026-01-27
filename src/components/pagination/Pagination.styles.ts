import styled, { css } from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 0;
  font-family: var(--fontfamily);
`;

export const PagesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PageButton = styled.button<{
  $active: boolean;
}>`
  font-family: var(--fontfamily);
  font-size: 14px;
  font-weight: ${props => props.$active ? '600' : '400'};
  color: ${props => props.$active ? 'var(--color-white)' : 'var(--color-primary)'};
  background: ${props => props.$active ? 'var(--color-primary)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'var(--color-primary)' : 'var(--color-primary-light)'};
  border-radius: 4px;
  padding: 6px 10px;
  min-width: 32px;
  height: 32px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${props => !props.$active ? 'var(--color-primary-light)' : 'var(--color-primary)'};
    border-color: var(--color-primary);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(38, 48, 69, 0.1);
  }
`;

export const Ellipsis = styled.span`
  font-family: var(--fontfamily);
  font-size: 14px;
  color: var(--color-primary);
  padding: 0 4px;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageInfo = styled.span`
  font-family: var(--fontfamily);
  font-size: 14px;
  color: var(--color-primary);
  margin-right: 12px;
`;
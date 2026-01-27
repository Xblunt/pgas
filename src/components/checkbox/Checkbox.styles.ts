import styled from 'styled-components';

export const CheckboxContainer = styled.label<{
  $disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  gap: 8px;
`;

export const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const Checkmark = styled.span<{
  $checked: boolean;
  $disabled: boolean;
}>`
  position: relative;
  height: 20px;
  width: 20px;
  border: 2px solid var(--color-primary);
  border-radius: 4px;
  background-color: ${props => 
    props.$checked ? 'var(--color-primary)' : 'transparent'};
  transition: all 0.2s ease;

  &:after {
    content: "";
    position: absolute;
    display: ${props => props.$checked ? 'block' : 'none'};
    left: 4.5px;
    top: 0;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export const CheckboxLabel = styled.span<{
  $disabled: boolean;
}>`
  font-family: var(--fontfamily);
  font-size: 14px;
  color: ${props => 
    props.$disabled ? 'rgba(38, 48, 69, 0.5)' : 'var(--color-primary)'};
`;
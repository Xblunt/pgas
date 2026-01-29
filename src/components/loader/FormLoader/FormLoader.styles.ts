import styled, { keyframes } from "styled-components";

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const FormLoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px 0;
`;

export const FormLoaderCircle = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  
  &:after {
    content: " ";
    display: block;
    width: 32px;
    height: 32px;
    margin: 4px;
    border-radius: 50%;
    border: 3px solid var(--color-primary);
    border-color: var(--color-primary) transparent var(--color-primary) transparent;
    animation: ${spin} 1.2s linear infinite;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    
    &:after {
      width: 26px;
      height: 26px;
    }
  }
`;

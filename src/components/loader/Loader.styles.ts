import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const LoaderCircle = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  
  &:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    margin: 4px;
    border-radius: 50%;
    border: 4px solid var(--color-primary);
    border-color: var(--color-primary) transparent var(--color-primary) transparent;
    animation: ${spin} 1.2s linear infinite;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    &:after {
      width: 32px;
      height: 32px;
    }
  }
`;

export const ContentLoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 150px; /* Увеличил минимальную высоту */
`;

export const ContentLoaderCircle = styled.div`
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
import { DefaultButton } from '@/components/buttons';
import styled from 'styled-components';

interface AuthContainerProps {
  $isSignUp?: boolean;
}

export const AuthContainer = styled.div<AuthContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${props => props.$isSignUp ? '110px 40px 40px' : '110px'};
  
  @media (max-width: 768px) {
    padding: ${props => props.$isSignUp ? '40px 20px 40px' : '110px 20px 40px'};
    align-items: flex-start;
  }
`;

export const AuthCard = styled.div`
  background: var(--color-white);
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 550px;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 32px 20px;
    border-radius: 10px;
    margin-top: 40px;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--color-white);
  border: 1px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    top: -40px;
  }
`;

export const AuthIcon = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

export const SystemTitle = styled.h2`
  font-family: var(--fontfamily);
  font-size: 24px;
  font-weight: 600;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 8px;
  
  position: relative;
  padding-bottom: 20px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 350px;
    height: 2px;
    background-color: var(--color-secondary);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 20px;
    padding-bottom: 16px;
    margin-bottom: 6px;
    
    &::after {
      width: 280px;
    }
  }
`;

export const Title = styled.h1`
  font-family: var(--fontfamily);
  font-size: 26px;
  font-weight: 600;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 24px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    gap: 16px;
    margin-top: 32px;
  }
`;

export const SubmitButton = styled(DefaultButton)`
  margin-top: 10px;
`;

export const SwitchFormText = styled.p`
  font-family: var(--fontfamily);
  font-size: 14px;
  color: var(--color-primary);
  text-align: center;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-top: 16px;
    line-height: 1.4;
  }
`;

export const SwitchLink = styled.span`
  color: var(--color-primary);
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    opacity: 0.8;
  }
`;
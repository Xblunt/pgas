import styled, { keyframes } from "styled-components";
import { DefaultButton } from "@/components/buttons";

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const AccordionGroup = styled.div`
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-white);
`;

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px;
  background: var(--color-white);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(38, 49, 69, 0.04);
  }

  @media (max-width: 768px) {
    padding: 12px;
    gap: 10px;
  }
`;

export const GroupHeaderText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const HeaderTitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const HeaderSubtitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 14px;
  font-weight: 500;
  color: rgba(38, 49, 69, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const GroupActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const SquareButton = styled(DefaultButton)`
  width: 40px;
  min-width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 36px;
    min-width: 36px;
    height: 36px;
    font-size: 14px;
  }
`;

export const CountBox = styled.div`
  width: 44px;
  min-width: 44px;
  height: 40px;
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fontfamily);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);

  @media (max-width: 768px) {
    width: 40px;
    min-width: 40px;
    height: 36px;
    font-size: 14px;
  }
`;

export const ChevronButton = styled.button`
  width: 44px;
  min-width: 44px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: opacity 0.2s ease, background-color 0.2s ease;

  &:hover {
    opacity: 0.8;
    background: rgba(38, 49, 69, 0.06);
  }

  @media (max-width: 768px) {
    width: 40px;
    min-width: 40px;
    height: 36px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const GroupBody = styled.div`
  border-top: 1px solid var(--color-primary);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100px;

  @media (max-width: 768px) {
    padding: 10px;
    gap: 8px;
    min-height: 80px;
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100px;
  padding: 20px 0;
`;

export const LoaderSpinner = styled.div`
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

export const AchievementRow = styled.div`
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 10px;
    gap: 10px;
  }
`;

export const AchievementIndex = styled.div`
  width: 44px;
  height: 44px;
  border: 1px solid var(--color-secondary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fontfamily);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;

export const AchievementContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const AchievementMain = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const AchievementTitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const AchievementSubtitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 14px;
  font-weight: 500;
  color: rgba(38, 49, 69, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const AchievementRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
    
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const PointsChip = styled.div`
  border: 1px solid var(--color-secondary);
  border-radius: 10px;
  height: 32px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fontfamily);
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 28px;
    font-size: 12px;
    padding: 0 8px;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

export const TagChip = styled.div`
  border: 1px solid var(--color-secondary);
  border-radius: 10px;
  height: 32px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fontfamily);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 28px;
    font-size: 12px;
    padding: 0 8px;
  }
`;

export const IconActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-left: auto;
    flex-shrink: 0;
    
    button {
      width: 28px;
      height: 28px;
      min-width: 28px;
      
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;
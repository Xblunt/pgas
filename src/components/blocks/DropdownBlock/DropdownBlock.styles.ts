import styled from "styled-components";
import { DefaultButton } from "@/components/buttons";

export const AccordionGroup = styled.div`
  border: 2px solid var(--color-primary);
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
`;

export const GroupHeaderText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const HeaderTitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const HeaderSubtitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 14px;
  font-weight: 500;
  color: rgba(38, 49, 69, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GroupActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const SquareButton = styled(DefaultButton)`
  width: 40px;
  min-width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 8px;
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
`;

export const GroupBody = styled.div`
  border-top: 2px solid var(--color-primary);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AchievementRow = styled.div`
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AchievementIndex = styled.div`
  width: 44px;
  height: 44px;
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fontfamily);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;
`;

export const AchievementMain = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const AchievementTitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AchievementSubtitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 14px;
  font-weight: 500;
  color: rgba(38, 49, 69, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AchievementRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const PointsChip = styled.div`
  border: 1px solid var(--color-primary);
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
`;

export const TagChip = styled.div`
  border: 1px solid var(--color-primary);
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
`;

export const IconActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

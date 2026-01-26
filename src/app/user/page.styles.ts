import styled from "styled-components";

export const SectionTitle = styled.h2`
  margin: 0 0 -10px 0;
  font-family: var(--fontfamily);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
`;

export const InfoCard = styled.div`
  background: var(--color-white);
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const RankBox = styled.div`
  width: 54px;
  height: 54px;
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fontfamily);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;
`;

export const InfoText = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InfoPrimary = styled.div`
  font-family: var(--fontfamily);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const InfoSecondary = styled.div`
  font-family: var(--fontfamily);
  font-size: 14px;
  font-weight: 500;
  color: rgba(38, 49, 69, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AchievementsBlock = styled.div``;

export const DividerSpace = styled.div`
  height: 14px;
`;

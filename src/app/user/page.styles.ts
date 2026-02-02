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

export const AchievementsBlock = styled.div``;

export const DividerSpace = styled.div`
  height: 14px;
`;

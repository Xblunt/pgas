import styled from "styled-components";

export const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 0;

  @media (max-width: 768px) {
    padding: 14px 0;
    gap: 12px;
  }
`;

export const ToolbarTitle = styled.h1`
  margin: 0;
  font-family: var(--fontfamily);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary);

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;

export const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;
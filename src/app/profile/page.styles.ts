import styled from "styled-components";
import { DefaultButton } from "@/components/buttons";

export const ProfilePageContainer = styled.div`
  padding: 120px 60px 60px;
  max-width: 980px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 110px 20px 40px;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--color-toned);
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 16px 20px;
`;

export const ToolbarTitle = styled.h1`
  margin: 0;
  font-family: var(--fontfamily);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary);
`;

export const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ActionButton = styled(DefaultButton)`
  height: 40px;
`;

export const Card = styled.div`
  margin-top: 20px;
  background: var(--color-white);
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 28px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterHint = styled.div`
  margin-top: 18px;
  font-family: var(--fontfamily);
  font-size: 13px;
  color: rgba(38, 49, 69, 0.7);
`;

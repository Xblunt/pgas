import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 120px 60px 60px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 110px 20px 40px;
  }
`;

export const Title = styled.h1`
  margin: 0 0 14px;
  font-family: var(--fontfamily);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary);
`;

export const Card = styled.div`
  background: var(--color-white);
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 20px;
`;

export const Text = styled.div`
  font-family: var(--fontfamily);
  font-size: 16px;
  font-weight: 500;
  color: rgba(38, 49, 69, 0.75);
`;

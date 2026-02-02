import styled from "styled-components";

export const Card = styled.div`
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
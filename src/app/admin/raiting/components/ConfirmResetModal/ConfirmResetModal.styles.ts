import styled from "styled-components";

export const ModalContent = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MessageText = styled.p`
  margin: 0;
  font-family: var(--fontfamily);
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-primary);
`;

export const WarningText = styled.p`
  margin: 8px 0 0 0;
  font-family: var(--fontfamily);
  font-size: 14px;
  line-height: 1.4;
  color: var(--color-error);
  font-weight: 500;
`;
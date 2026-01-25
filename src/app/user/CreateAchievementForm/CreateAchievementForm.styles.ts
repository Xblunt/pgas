import styled from "styled-components";
import { DefaultButton } from "@/components/buttons";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FileRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FileButton = styled(DefaultButton)`
  height: 44px;
  border-radius: 6px;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

import styled from "styled-components";

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    left: 10px;
    align-items: center;
  }
`;
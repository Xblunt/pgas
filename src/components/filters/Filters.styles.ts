// Filters.styles.ts (обновленная часть для FiltersActions)
import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

export const FiltersSearchSection = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const FiltersCheckboxSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const FiltersActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
`;
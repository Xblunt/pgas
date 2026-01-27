// Filters.tsx
"use client";

import React from "react";
import { DefaultInput } from "@/components/inputs";
import Checkbox from "../checkbox";
import { 
  FiltersContainer,
  FiltersSearchSection,
  FiltersCheckboxSection,
} from "./Filters.styles";

export interface CheckboxAction {
  label: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export interface FiltersProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  checkboxes?: CheckboxAction[];
  children?: React.ReactNode;
}

const Filters: React.FC<FiltersProps> = ({ 
  searchValue, 
  onSearchChange,
  searchPlaceholder = "Поиск...",
  checkboxes,
  children 
}) => {
  return (
    <FiltersContainer>
      <FiltersSearchSection>
        {onSearchChange && (
          <DefaultInput
            value={searchValue || ''}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            fullWidth
          />
        )}
      </FiltersSearchSection>
      
      {checkboxes && checkboxes.length > 0 && (
        <FiltersCheckboxSection>
          {checkboxes.map((checkbox, index) => (
            <Checkbox
              key={index}
              label={checkbox.label}
              checked={checkbox.checked}
              onChange={checkbox.onChange}
              disabled={checkbox.disabled}
            />
          ))}
        </FiltersCheckboxSection>
      )}
      
      {children}
      
    </FiltersContainer>
  );
};

export default Filters;
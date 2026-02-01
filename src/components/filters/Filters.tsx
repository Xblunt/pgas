// Filters.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
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

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

const Filters: React.FC<FiltersProps> = ({ 
  searchValue = "", 
  onSearchChange,
  searchPlaceholder = "Поиск...",
  checkboxes,
  children,
}) => {
  const [inputValue, setInputValue] = useState(searchValue);
  
  const debouncedSearchChange = useCallback(
    debounce((value: string) => {
      if (onSearchChange) {
        onSearchChange(value);
      }
    }, 300),
    [onSearchChange]
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedSearchChange(value);
  };

  useEffect(() => {
    setInputValue(searchValue || "");
  }, [searchValue]);

  return (
    <FiltersContainer>
      <FiltersSearchSection>
        {onSearchChange && (
          <DefaultInput
            value={inputValue}
            onChange={handleInputChange}
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
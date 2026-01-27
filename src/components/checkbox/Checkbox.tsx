"use client";

import React, { useState } from 'react';
import { 
  CheckboxContainer, 
  CheckboxInput, 
  Checkmark, 
  CheckboxLabel 
} from './Checkbox.styles';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  disabled = false,
  onChange,
  className
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <CheckboxContainer className={className} $disabled={disabled}>
      <CheckboxInput
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      <Checkmark $checked={isChecked} $disabled={disabled} />
      {label && (
        <CheckboxLabel $disabled={disabled}>
          {label}
        </CheckboxLabel>
      )}
    </CheckboxContainer>
  );
};

export default Checkbox;
import React, { useState, useRef, useEffect } from 'react';
import { 
  InputWrapper, 
  InputLabel, 
  ErrorText, 
  DropdownContainer, 
  SelectedValue, 
  DropdownIcon, 
  DropdownList, 
  DropdownItem 
} from './DropdownInput.styles';

export interface DropdownOption {
  value: string | number;
  label: string;
}

export interface DropdownInputProps {
  value?: string | number;
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  options: DropdownOption[];
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const DropdownInput: React.FC<DropdownInputProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.value !== undefined) {
      const selectedOption = props.options.find(option => option.value === props.value);
      setSelectedLabel(selectedOption?.label || '');
    } else {
      setSelectedLabel('');
    }
  }, [props.value, props.options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (props.disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen && props.onFocus) {
      props.onFocus();
    }
  };

  const handleSelect = (option: DropdownOption) => {
    if (props.disabled) return;
    
    if (props.onChange) {
      props.onChange(option.value);
    }
    setIsOpen(false);
    
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const handleBlur = () => {
    setIsOpen(false);
    if (props.onBlur) {
      props.onBlur();
    }
  };

  return (
    <InputWrapper className={props.className} $fullWidth={!!props.fullWidth}>
      {props.label && (
        <InputLabel $hasError={!!props.error}>
          {props.label}
        </InputLabel>
      )}
      <DropdownContainer 
        ref={dropdownRef} 
        $isOpen={isOpen} 
        $hasError={!!props.error}
        $disabled={!!props.disabled}
        $fullWidth={!!props.fullWidth}
      >
        <SelectedValue 
          onClick={handleToggle}
          $hasValue={!!selectedLabel}
          $disabled={!!props.disabled}
        >
          {selectedLabel || props.placeholder || 'Выберите...'}
        </SelectedValue>
        <DropdownIcon 
          onClick={handleToggle}
          $isOpen={isOpen}
          $disabled={!!props.disabled}
        >
          ▼
        </DropdownIcon>
        {isOpen && (
          <DropdownList>
            {props.options.map((option, index) => (
              <DropdownItem
                key={index}
                onClick={() => handleSelect(option)}
                $isSelected={option.value === props.value}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </InputWrapper>
  );
};
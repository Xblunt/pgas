import React, { useState, useEffect } from 'react';
import { StyledNumberInput, InputWrapper, InputLabel, ErrorText, ControlsContainer, ControlButton } from './NumberInput.styles';

export interface NumberInputProps {
  value?: number;
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const NumberInput: React.FC<NumberInputProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (!isFocused) {
      setInputValue(props.value !== undefined && props.value !== null ? String(props.value) : '');
    }
  }, [props.value, isFocused]);

  const sanitizeInput = (value: string): string => {
    return value.replace(/[^0-9.]/g, '');
  };

  const parseAndValidateNumber = (value: string): number | null => {
    if (value === '') return null;
    
    const cleanedValue = sanitizeInput(value);
    if (cleanedValue === '') return 0;
    
    const numValue = Number(cleanedValue);
    if (isNaN(numValue)) return 0;
    
    let finalValue = numValue;
    
    if (props.min !== undefined) {
      finalValue = Math.max(finalValue, props.min);
    }
    
    if (props.max !== undefined) {
      finalValue = Math.min(finalValue, props.max);
    }
    
    return finalValue;
  };

  const handleIncrement = () => {
    if (props.disabled) return;
    
    const currentValue = Number(props.value) || 0;
    const step = props.step || 1;
    const max = props.max;
    const newValue = max !== undefined ? Math.min(currentValue + step, max) : currentValue + step;
    
    if (props.onChange) {
      props.onChange(newValue);
    }
    setInputValue(String(newValue));
  };

  const handleDecrement = () => {
    if (props.disabled) return;
    
    const currentValue = Number(props.value) || 0;
    const step = props.step || 1;
    const min = props.min !== undefined ? Math.max(0, props.min) : 0;
    const newValue = Math.max(currentValue - step, min);
    
    if (props.onChange) {
      props.onChange(newValue);
    }
    setInputValue(String(newValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;
    
    const value = e.target.value;
    const sanitizedValue = sanitizeInput(value);
    setInputValue(sanitizedValue);
    
    if (sanitizedValue === '') {
      return;
    }
    
    const parsedValue = parseAndValidateNumber(sanitizedValue);
    if (parsedValue !== null && props.onChange) {
      props.onChange(parsedValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+' || e.key === ',' || e.key === 'б' || e.key === 'ю') {
      e.preventDefault();
    }
    
    if ((e.key === '.' || e.key === 'ю') && inputValue.includes('.')) {
      e.preventDefault();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    
    if (inputValue === '') {
      const minValue = props.min !== undefined ? Math.max(0, props.min) : 0;
      if (props.onChange) {
        props.onChange(minValue);
      }
      setInputValue(String(minValue));
    } else {
      const parsedValue = parseAndValidateNumber(inputValue);
      if (parsedValue !== null) {
        if (props.onChange) {
          props.onChange(parsedValue);
        }
        setInputValue(String(parsedValue));
      } else {
        const minValue = props.min !== undefined ? Math.max(0, props.min) : 0;
        setInputValue(String(minValue));
      }
    }
    
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue(props.value !== undefined && props.value !== null ? String(props.value) : '');
    
    if (props.onFocus) {
      props.onFocus();
    }
  };

  const displayValue = isFocused ? inputValue : (props.value !== undefined && props.value !== null ? String(props.value) : '');

  return (
    <InputWrapper className={props.className} $fullWidth={!!props.fullWidth}>
      {props.label && (
        <InputLabel $hasError={!!props.error}>
          {props.label}
        </InputLabel>
      )}
      <ControlsContainer>
        <StyledNumberInput
          type="text"
          inputMode="decimal"
          $hasError={!!props.error}
          $fullWidth={!!props.fullWidth}
          value={displayValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <ControlButton 
          type="button" 
          onClick={handleDecrement} 
          $position="left"
          disabled={props.disabled}
        >
          -
        </ControlButton>
        <ControlButton 
          type="button" 
          onClick={handleIncrement} 
          $position="right"
          disabled={props.disabled}
        >
          +
        </ControlButton>
      </ControlsContainer>
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </InputWrapper>
  );
};

export default NumberInput;
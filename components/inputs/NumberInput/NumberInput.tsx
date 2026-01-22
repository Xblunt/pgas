import React from 'react';
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

export const NumberInput: React.FC<NumberInputProps> = (props) => {
  const handleIncrement = () => {
    if (props.disabled) return;
    
    const currentValue = Number(props.value) || 0;
    const step = props.step || 1;
    const max = props.max;
    const newValue = max !== undefined ? Math.min(currentValue + step, max) : currentValue + step;
    
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  const handleDecrement = () => {
    if (props.disabled) return;
    
    const currentValue = Number(props.value) || 0;
    const step = props.step || 1;
    const min = props.min;
    const newValue = min !== undefined ? Math.max(currentValue - step, min) : currentValue - step;
    
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;
    
    const value = e.target.value;
    
    if (props.onChange) {
      if (value === '') {
        props.onChange(0);
      } else {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          props.onChange(numValue);
        }
      }
    }
  };

  const handleBlur = () => {
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const handleFocus = () => {
    if (props.onFocus) {
      props.onFocus();
    }
  };

  return (
    <InputWrapper className={props.className} $fullWidth={!!props.fullWidth}>
      {props.label && (
        <InputLabel $hasError={!!props.error}>
          {props.label}
        </InputLabel>
      )}
      <ControlsContainer>
        <StyledNumberInput
          type="number"
          $hasError={!!props.error}
          $fullWidth={!!props.fullWidth}
          value={props.value}
          min={props.min}
          max={props.max}
          step={props.step}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={handleChange}
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
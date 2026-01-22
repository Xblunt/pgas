import React, { useState } from 'react';
import { StyledInput, InputWrapper, InputLabel, ErrorText, PasswordToggle } from './DefaultInput.styles';

export interface DefaultInputProps {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  isPassword?: boolean;
  mask?: (value: string) => string;
  maxLength?: number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const DefaultInput: React.FC<DefaultInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Применяем маску если она есть
    if (props.mask && !isFocused) {
      value = props.mask(value);
    }
    
    if (props.onChange) {
      props.onChange(value);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Применяем маску при потере фокуса
    if (props.mask && props.value && props.onChange) {
      props.onChange(props.mask(props.value));
    }
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = props.isPassword 
    ? (showPassword ? 'text' : 'password')
    : (props.type || 'text');

  return (
    <InputWrapper className={props.className} $fullWidth={!!props.fullWidth}>
      {props.label && (
        <InputLabel $hasError={!!props.error}>
          {props.label}
        </InputLabel>
      )}
      <div style={{ position: 'relative' }}>
        <StyledInput
          $hasError={!!props.error}
          $fullWidth={!!props.fullWidth}
          type={inputType}
          value={props.value || ''}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          maxLength={props.maxLength}
        />
        {props.isPassword && (
          <PasswordToggle
            type="button"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? 'Скрыть' : 'Показать'}
          </PasswordToggle>
        )}
      </div>
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </InputWrapper>
  );
};

export default DefaultInput;
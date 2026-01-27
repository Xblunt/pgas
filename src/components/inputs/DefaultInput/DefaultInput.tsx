"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useMask } from '@react-input/mask';
import { 
  StyledInput, 
  InputWrapper, 
  InputLabel, 
  ErrorText, 
  PasswordToggle,
  ChangePasswordLink 
} from './DefaultInput.styles';

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
  mask?: 'phone' | 'date' | ((value: string) => string);
  maxLength?: number;
  required?: boolean;
  validateEmail?: boolean;
  hideViewPassword?: boolean;
  hideChangePassword?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onChangePassword?: () => void;
}

const DefaultInput = (props: DefaultInputProps) => {
  const [localValue, setLocalValue] = useState(props.value || '');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const internalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.value !== undefined && props.value !== localValue) {
      setLocalValue(props.value);
    }
  }, [props.value]);

  const phoneMaskRef = useMask({
    mask: '+7 (___) ___-__-__',
    replacement: { _: /\d/ },
  });

  const dateMaskRef = useMask({
    mask: 'dd.mm.yyyy',
    replacement: {
      d: /[0-3]/,
      m: /[0-1]/,
      y: /\d/,
    },
  });

  const validateEmailValue = (email: string): boolean => {
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      setEmailError('');
      return true;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError('Введите корректный email адрес');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  let maskRef = null;
  if (props.mask === 'phone') {
    maskRef = phoneMaskRef;
  } else if (props.mask === 'date') {
    maskRef = dateMaskRef;
  }

  const setRefs = (element: HTMLInputElement | null) => {
    if (maskRef && element) {
      maskRef.current = element;
    }
    
    internalRef.current = element;
  };

  const changeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value.trim();
    
    setLocalValue(value);
    
    if (props.validateEmail && props.type === 'email') {
      if (!trimmedValue) {
        setEmailError('');
        
        if (props.onChange) {
          props.onChange(value);
        }
      } else {
        const isValid = validateEmailValue(value);
        
        if (isValid) {
          setValidationError('');
          if (props.onChange) {
            props.onChange(value);
          }
        }
      }
    } else {
      if (props.mask === 'phone' || props.mask === 'date') {
        if (changeTimeoutRef.current) {
          clearTimeout(changeTimeoutRef.current);
        }
        
        changeTimeoutRef.current = setTimeout(() => {
          if (props.onChange) {
            props.onChange(value);
          }
        }, 100);
      } else {
        if (props.onChange) {
          props.onChange(value);
        }
      }
    }
  };

  const handleBlur = () => {
    const hasValue = localValue.trim().length > 0;
    
    if (props.validateEmail && props.type === 'email') {
      if (hasValue) {
        validateEmailValue(localValue);
        setValidationError('');
      } else if (props.required) {
        setValidationError('Это поле обязательно');
      } else {
        setEmailError('');
        setValidationError('');
      }
    } else {
      if (props.required && !hasValue) {
        setValidationError('Это поле обязательно');
      } else {
        setValidationError('');
      }
    }
    
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePasswordClick = () => {
    if (props.onChangePassword && !props.disabled) {
      props.onChangePassword();
    }
  };

  const inputType = props.isPassword 
    ? (showPassword ? 'text' : 'password')
    : (props.type || 'text');

  const showError = props.error || emailError || validationError;
  
  const shouldShowChangePasswordLink = 
    props.isPassword && 
    !props.hideChangePassword
 
  const shouldShowPasswordToggle = 
    props.isPassword && 
    !props.hideViewPassword && 
    !props.disabled;

  return (
    <InputWrapper className={props.className} $fullWidth={!!props.fullWidth}>
      {props.label && (
        <InputLabel $hasError={!!showError}>
          {props.label}
          {props.required && ' *'}
        </InputLabel>
      )}
      <div style={{ position: 'relative' }}>
        <StyledInput
          ref={setRefs}
          $hasError={!!showError}
          $fullWidth={!!props.fullWidth}
          type={inputType}
          value={localValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={props.onFocus}
          maxLength={props.maxLength}
        />
        {shouldShowPasswordToggle && (
          <PasswordToggle
            type="button"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? 'Скрыть' : 'Показать'}
          </PasswordToggle>
        )}
      </div>
      {shouldShowChangePasswordLink && (
        <ChangePasswordLink 
          onClick={handleChangePasswordClick}
        >
          Сменить пароль
        </ChangePasswordLink>
      )}
      {showError && <ErrorText>{showError}</ErrorText>}
    </InputWrapper>
  );
};

DefaultInput.displayName = 'DefaultInput';

export default DefaultInput;
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
  validatePassword?: boolean;
  hideViewPassword?: boolean;
  hideChangePassword?: boolean;
  onChange?: (value: string, isValid: boolean) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onChangePassword?: () => void;
}

const DefaultInput = (props: DefaultInputProps) => {
  const [localValue, setLocalValue] = useState(props.value || '');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [maskError, setMakError] = useState<string>('');

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

  const isMaskComplete = (value: string): boolean => {
    if ((props.mask === 'phone' && value.length !== 18) || (props.mask === 'date' && value.length !== 10)) {
      setMakError('Необходимо заполнить полностью')
      return false;
    }

    setMakError('');
    return true;
  };

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

  const validatePasswordValue = (password: string): boolean => {
    const trimmedPassword = password.trim();
    
    if (!trimmedPassword) {
      setPasswordError('');
      return true;
    }
    
    if (trimmedPassword.length < 8) {
      setPasswordError('Пароль должен содержать минимум 8 символов');
      return false;
    }
    
    setPasswordError('');
    return true;
  };


  const validateRequaried = (value: string): boolean => {
    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      setValidationError('Это поле обязательно');
      return false;
    }
    
    
    setValidationError('');
    return true;
  };

  const validateField = (value: string): boolean => {
    let validEmail = true;
    let validPassword = true;
    let validRequired = true;
    let validMask = true;
    
    if (props.validateEmail && props.type === 'email') {
      validEmail = validateEmailValue(value);
    }
    
    if (props.validatePassword && props.isPassword && value.trim()) {
      validPassword = validatePasswordValue(value);
    }
    
    if (props.required) {
      validRequired = validateRequaried(value);
    }
    
    if (props.mask && (props.mask === 'phone' || props.mask === 'date')) {
      if (value.trim()) {
        validMask = isMaskComplete(value);
      }
    }
    
    const result = validEmail && validPassword && validRequired && validMask

    return result;
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
    
    setLocalValue(value);
    
    const fieldIsValid = validateField(value);
    
    if (props.validateEmail || props.mask === 'phone' || props.mask === 'date' || props.validatePassword) {
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }
      
      changeTimeoutRef.current = setTimeout(() => {
        if (props.onChange) {
          props.onChange(value, fieldIsValid);
        }
      }, 100);
    } else {
      if (props.onChange) {
        props.onChange(value, fieldIsValid);
      }
    }
  };

  const handleBlur = () => {
    validateField(localValue);
       
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePasswordClick = () => {
    if (props.onChangePassword) {
      props.onChangePassword();
    }
  };

  const inputType = props.isPassword 
    ? (showPassword ? 'text' : 'password')
    : (props.type || 'text');

  const showError = props.error || emailError || passwordError || maskError || validationError;
  
  const shouldShowChangePasswordLink = 
    props.isPassword && 
    !props.hideChangePassword;
  
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
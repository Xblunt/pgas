import React, { useState, useRef, useEffect } from 'react';
import { StyledTextArea, TextAreaWrapper, TextAreaLabel, ErrorText } from './TextareaInput.styles';

export interface TextareaInputProps {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  onChange?: (value: string, isValid: boolean) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const TextareaInput: React.FC<TextareaInputProps> = (props) => {
  const [localValue, setLocalValue] = useState(props.value || '');
  const [validationError, setValidationError] = useState<string>('');
  const [hasBlurred, setHasBlurred] = useState<boolean>(false);

  const changeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (props.value !== undefined && props.value !== localValue) {
      setLocalValue(props.value);
    }
  }, [props.value]);

  const validateRequired = (value: string): boolean => {
    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      setValidationError('Это поле обязательно');
      return false;
    }
    
    setValidationError('');
    return true;
  };

  const validateMaxLength = (value: string): boolean => {
    if (props.maxLength && value.length > props.maxLength) {
      setValidationError(`Максимальная длина: ${props.maxLength} символов`);
      return false;
    }
    
    if (validationError.includes('Максимальная длина')) {
      setValidationError('');
    }
    
    return true;
  };

  const validateField = (value: string): boolean => {
    let validRequired = true;
    let validMaxLength = true;
    
    if (props.required) {
      validRequired = validateRequired(value);
    }
    
    if (props.maxLength) {
      validMaxLength = validateMaxLength(value);
    }
    
    const result = validRequired && validMaxLength;
    return result;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    setLocalValue(value);
    
    const fieldIsValid = validateField(value);
    
    if (changeTimeoutRef.current) {
      clearTimeout(changeTimeoutRef.current);
    }
    
    changeTimeoutRef.current = setTimeout(() => {
      if (props.onChange) {
        props.onChange(value, fieldIsValid);
      }
    }, 100);
  };

  const handleBlur = () => {
    setHasBlurred(true);
    
    if (props.required) {
      validateRequired(localValue);
    }
    
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const handleFocus = () => {
    setHasBlurred(false);
    if (props.onFocus) {
      props.onFocus();
    }
  };

  const showError = props.error || (hasBlurred && validationError);

  return (
    <TextAreaWrapper className={props.className} $fullWidth={!!props.fullWidth}>
      {props.label && (
        <TextAreaLabel $disabled={props.disabled} $hasError={!!showError}>
          {props.label}
          {props.required && ' *'}
        </TextAreaLabel>
      )}
      <StyledTextArea
        $hasError={!!showError}
        $fullWidth={!!props.fullWidth}
        rows={props.rows || 3}
        value={localValue}
        placeholder={props.placeholder}
        disabled={props.disabled}
        maxLength={props.maxLength}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {showError && <ErrorText>{showError}</ErrorText>}
    </TextAreaWrapper>
  );
};

export default TextareaInput;
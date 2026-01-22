import React from 'react';
import { StyledInput, InputWrapper, InputLabel, ErrorText } from './DefaultInput.styles';

export interface DefaultInputProps {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const DefaultInput: React.FC<DefaultInputProps> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  return (
    <InputWrapper className={props.className} $fullWidth={!!props.fullWidth}>
      {props.label && (
        <InputLabel $hasError={!!props.error}>
          {props.label}
        </InputLabel>
      )}
      <StyledInput
        $hasError={!!props.error}
        $fullWidth={!!props.fullWidth}
        type={props.type || 'text'}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={handleChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </InputWrapper>
  );
};
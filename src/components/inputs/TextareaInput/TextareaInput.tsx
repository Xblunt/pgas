import React from 'react';
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
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const TextareaInput: React.FC<TextareaInputProps> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  return (
    <TextAreaWrapper className={props.className} $fullWidth={!!props.fullWidth}>
      {props.label && (
        <TextAreaLabel $hasError={!!props.error}>
          {props.label}
        </TextAreaLabel>
      )}
      <StyledTextArea
        $hasError={!!props.error}
        $fullWidth={!!props.fullWidth}
        rows={props.rows || 3}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={handleChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </TextAreaWrapper>
  );
};

export default TextareaInput;
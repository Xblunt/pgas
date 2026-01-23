"use client"

import React, { useEffect, useState } from 'react';
import { SignIn } from '@/models/Auth';
import { DefaultInput } from '@/components/inputs';
import { Form, SubmitButton, SwitchFormText, SwitchLink } from '../../page.styles';

interface LoginFormProps {
  data: SignIn;
  onChange: (field: keyof SignIn, value: string) => void;
  onSubmit: () => void;
  onSwitchToSignUp: () => void;
}

const SingInForm: React.FC<LoginFormProps> = ({ 
  data, 
  onChange, 
  onSubmit,
  onSwitchToSignUp 
}) => {
    const [isFormValid, setIsFormValid] = useState(false);
  
    useEffect(() => {
      const isValid = Boolean(
        data.email?.trim() &&
        data.password?.trim()
      );
      
      setIsFormValid(isValid);
    }, [data]);
  
  return (
    <Form onSubmit={(e: any) => e.preventDefault()}>
      <DefaultInput
        label="Email"
        type="email"
        value={data.email}
        validateEmail={true}
        required={true}
        onChange={(value) => onChange('email', value)}
        placeholder="example@email.com"
        fullWidth
      />

      <DefaultInput
        label="Пароль"
        type="password"
        required={true}
        value={data.password}
        onChange={(value) => onChange('password', value)}
        placeholder="Введите пароль"
        fullWidth
        isPassword
      />
      
      <SubmitButton
        variant="primary"
        onClick={onSubmit}
        fullWidth
        disabled={!isFormValid}
      >
        Войти
      </SubmitButton>
      
      <SwitchFormText>
        Нет аккаунта?{' '}
        <SwitchLink onClick={onSwitchToSignUp}>
          Зарегистрироваться
        </SwitchLink>
      </SwitchFormText>
    </Form>
  );
};

export default SingInForm;
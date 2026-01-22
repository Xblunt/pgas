"use client"

import React from 'react';
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
  return (
    <Form onSubmit={(e: any) => e.preventDefault()}>
      <DefaultInput
        label="Email"
        type="email"
        value={data.email}
        onChange={(value) => onChange('email', value)}
        placeholder="example@email.com"
        fullWidth
      />
      <DefaultInput
        label="Пароль"
        type="password"
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
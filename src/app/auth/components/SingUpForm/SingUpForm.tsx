"use client"

import React from 'react';
import { CreateUser } from '@/models/User';
import { DefaultInput } from '@/components/inputs';
import { Form, SubmitButton, SwitchFormText, SwitchLink } from '../../page.styles';

interface SignUpFormProps {
  data: CreateUser;
  onChange: (field: keyof CreateUser, value: string) => void;
  onSubmit: () => void;
  onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ 
  data, 
  onChange, 
  onSubmit,
  onSwitchToLogin 
}) => {
  const formatDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4) return `${cleaned.slice(0,2)}.${cleaned.slice(2)}`;
    return `${cleaned.slice(0,2)}.${cleaned.slice(2,4)}.${cleaned.slice(4,8)}`;
  };

  return (
    <Form onSubmit={(e: any) => e.preventDefault()}>
      <DefaultInput
        label="Имя"
        value={data.name}
        onChange={(value) => onChange('name', value)}
        placeholder="Введите имя"
        fullWidth
      />
      
      <DefaultInput
        label="Фамилия"
        value={data.second_name}
        onChange={(value) => onChange('second_name', value)}
        placeholder="Введите фамилию"
        fullWidth
      />
      
      <DefaultInput
        label="Отчество"
        value={data.patronymic}
        onChange={(value) => onChange('patronymic', value)}
        placeholder="Введите отчество"
        fullWidth
      />
      
      <DefaultInput
        label="Номер зачётной книжки"
        value={data.gradebook_number}
        onChange={(value) => onChange('gradebook_number', value)}
        placeholder="Введите номер зачётной книжки"
        fullWidth
      />
      
      <DefaultInput
        label="Дата рождения"
        value={data.birth_date}
        onChange={(value) => onChange('birth_date', value)}
        placeholder="dd.mm.yyyy"
        fullWidth
        mask={formatDate}
        maxLength={10}
      />
      
      <DefaultInput
        label="Email"
        type="email"
        value={data.email}
        onChange={(value) => onChange('email', value)}
        placeholder="example@email.com"
        fullWidth
      />
      
      <DefaultInput
        label="Номер телефона"
        value={data.phone_number}
        onChange={(value) => onChange('phone_number', value)}
        placeholder="+7 (999) 999-99-99"
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
        Зарегистрироваться
      </SubmitButton>
      
      <SwitchFormText>
        Уже есть аккаунт?{' '}
        <SwitchLink onClick={onSwitchToLogin}>
          Войти
        </SwitchLink>
      </SwitchFormText>
    </Form>
  );
};

export default SignUpForm;
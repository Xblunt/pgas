"use client"

import React, { useState } from 'react';
import {
  AuthContainer,
  AuthCard,
  IconContainer,
  AuthIcon,
  SystemTitle,
  Title
} from './page.styles';
import { CreateUser } from '@/models/User';
import { SignIn } from '@/models/Auth';
import { SingInForm, SingUpForm } from './components';

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInData, setSignInData] = useState<SignIn>({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState<CreateUser>({
    name: '',
    second_name: '',
    patronymic: '',
    gradebook_number: '',
    birth_date: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const handleSignInChange = (field: keyof SignIn, value: string) => {
    setSignInData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignUpChange = (field: keyof CreateUser, value: string) => {
    setSignUpData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignInSubmit = () => {
    console.log('Sign in data:', signInData);
  };

  const handleSignUpSubmit = () => {
    console.log('Sign up data:', signUpData);
  };

  return (
    <AuthContainer>
      <AuthCard>
        <IconContainer>
          <AuthIcon 
            src="/vstu-logo.svg" 
            alt="Логотип"
          />
        </IconContainer>
        
        <SystemTitle>Система подсчета рейтинга ПГАС</SystemTitle>
        
        {/* <Title>{isSignUp ? 'Регистрация' : 'Вход'}</Title> */}
        
        {!isSignUp ? (
          <SingInForm
            data={signInData}
            onChange={handleSignInChange}
            onSubmit={handleSignInSubmit}
            onSwitchToSignUp={() => setIsSignUp(true)}
          />
        ) : (
          <SingUpForm
            data={signUpData}
            onChange={handleSignUpChange}
            onSubmit={handleSignUpSubmit}
            onSwitchToLogin={() => setIsSignUp(false)}
          />
        )}
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthPage;
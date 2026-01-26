"use client";

import React, { useState } from "react";
import {
  AuthContainer,
  AuthCard,
  IconContainer,
  AuthIcon,
  SystemTitle,
} from "./page.styles";
import { CreateUser } from "@/models/User";
import { SignIn } from "@/models/Auth";
import { SingInForm, SingUpForm } from "./components";
import { useRouter } from "next/navigation";
import { useStores } from "@/hooks/useStores";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { authStore } = useStores();

  const [isSignUp, setIsSignUp] = useState(false);
  const [signInData, setSignInData] = useState<SignIn>({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState<CreateUser>({
    name: "",
    second_name: "",
    patronymic: "",
    gradebook_number: "",
    birth_date: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleSignInChange = (field: keyof SignIn, value: string) => {
    setSignInData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUpChange = (field: keyof CreateUser, value: string) => {
    setSignUpData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignInSubmit = () => {
    const email = signInData.email.trim();
    const password = signInData.password.trim();

    if (email === "student@gmail.com" && password === "1234") {
      authStore.setToken("mock-student-token");
      router.push("/user");
      return;
    }

    window.alert("Неверный email или пароль");
  };

  const handleSignUpSubmit = () => {
    console.log("Sign up data:", signUpData);
  };

  return (
      <AuthContainer $isSignUp={isSignUp}>
        <AuthCard>
          <IconContainer>
            <AuthIcon src="/vstu-logo.svg" alt="Логотип" />
          </IconContainer>

          <SystemTitle>Система подсчета рейтинга ПГАС</SystemTitle>

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

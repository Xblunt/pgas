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
import { ChangePasswordForm, SingInForm, SingUpForm } from "./components";
import { useRouter } from "next/navigation";
import { useStores } from "@/hooks/useStores";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { authStore } = useStores();

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [viewChangePasswordForm, setViewChangePasswordForm] = useState<boolean>(false);
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
  };

  const handleSignUpSubmit = () => {
    console.log("Sign up data:", signUpData);
  };

  const handleChangePassword = (newPassword: string, email?: string) => {
    if (!email) return;
    // authStore.setLoading(true)
    // setViewChangePasswordForm(false);
    console.log("newPassword", newPassword);
  }

  return (
    <>
      <AuthContainer $isSignUp={isSignUp}>
        <AuthCard>
          <IconContainer>
            <AuthIcon src="/vstu-logo.svg" alt="Логотип" />
          </IconContainer>

          <SystemTitle>Система подсчета рейтинга ПГАС</SystemTitle>

          {!isSignUp ? (
              <SingInForm
                  data={signInData}
                  loading={authStore.isLoading}
                  onChange={handleSignInChange}
                  onSubmit={handleSignInSubmit}
                  onChangePassword={() => setViewChangePasswordForm(true)}
                  onSwitchToSignUp={() => setIsSignUp(true)}
              />
          ) : (
              <SingUpForm
                  data={signUpData}
                  loading={authStore.isLoading}
                  onChange={handleSignUpChange}
                  onSubmit={handleSignUpSubmit}
                  onSwitchToLogin={() => setIsSignUp(false)}
              />
          )}
        </AuthCard>
      </AuthContainer>

      {viewChangePasswordForm && <ChangePasswordForm onClose={() => setViewChangePasswordForm(false)} onSave={handleChangePassword} email={signInData.email} />}
    </>
  );
};

export default AuthPage;

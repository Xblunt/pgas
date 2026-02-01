"use client";

import React, { useState } from "react";
import {
  AuthContainer,
  AuthCard,
  IconContainer,
  AuthIcon,
  SystemTitle,
} from "./page.styles";
import { User } from "@/models/User";
import { SignIn } from "@/models/Auth";
import { ChangePasswordForm, SingInForm, SingUpForm } from "./components";
import { useRouter } from "next/navigation";
import { useStores } from "@/hooks/useStores";
import { AuthService } from "@/services";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { authStore } = useStores();
  const _authService = AuthService.getInstance();

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [viewChangePasswordForm, setViewChangePasswordForm] = useState<boolean>(false);

  const [signInData, setSignInData] = useState<SignIn>({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState<User>({
    name: "",
    second_name: "",
    patronymic: "",
    gradebook_number: "",
    birth_date: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const routeAfterAuth = (access: string) => {
    router.replace(authStore.isRoot  ? "/admin/raiting" : "/user");
  };

  const handleSignInChange = (field: keyof SignIn, value: string) => {
    setSignInData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUpChange = (field: keyof User, value: string) => {
    setSignUpData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignInSubmit = async () => {
    const tokens = await _authService.signIn(signInData);
    routeAfterAuth(tokens.accessToken);
  };

  const handleSignUpSubmit = async () => {
    const tokens = await _authService.signUp(signUpData);
    routeAfterAuth(tokens.accessToken);
  };

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

        {viewChangePasswordForm && (
            <ChangePasswordForm
                onClose={() => setViewChangePasswordForm(false)}
            />
        )}
      </>
  );
};

export default AuthPage;

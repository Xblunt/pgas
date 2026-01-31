"use client";

import React, { useEffect, useState } from "react";
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

function decodeJwtPayload(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "===".slice((base64.length + 3) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

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

  useEffect(() => {
    if (!authStore.isHydrated) return;
    if (!authStore.token) return;

    const payload = decodeJwtPayload(authStore.token);
    const isAdmin =
        payload?.IsAdmin === true ||
        payload?.is_admin === true ||
        payload?.isAdmin === true;

    router.replace(isAdmin ? "/admin/raiting" : "/user");
  }, [authStore.isHydrated, authStore.token, router]);

  const routeAfterAuth = (access: string) => {
    const payload = decodeJwtPayload(access);
    const isAdmin =
        payload?.IsAdmin === true ||
        payload?.is_admin === true ||
        payload?.isAdmin === true;

    router.replace(isAdmin ? "/admin/raiting" : "/user");
  };

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

  const handleSignInSubmit = async () => {
    const tokens = await authStore.signIn(signInData);
    routeAfterAuth(tokens.accessToken);
  };

  const handleSignUpSubmit = async () => {
    const tokens = await authStore.signUp(signUpData);
    routeAfterAuth(tokens.accessToken);
  };

  const handleChangePassword = async (newPassword: string) => {
    await authStore.changePassword(newPassword);
    setViewChangePasswordForm(false);
  };

  if (!authStore.isHydrated) {
    return null;
  }

  if (authStore.token) {
    return null;
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

        {viewChangePasswordForm && (
            <ChangePasswordForm
                onClose={() => setViewChangePasswordForm(false)}
                onSave={handleChangePassword}
            />
        )}
      </>
  );
};

export default AuthPage;

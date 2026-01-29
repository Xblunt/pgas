"use client";

import React, { useEffect, useState } from "react";
import { SignIn } from "@/models/Auth";
import { DefaultInput } from "@/components/inputs";
import { Form, SubmitButton, SwitchFormText, SwitchLink } from "../../page.styles";
import { ButtonVariant } from "@/models/types";

interface LoginFormProps {
    data: SignIn;
    onChange: (field: keyof SignIn, value: string, isValid?: boolean) => void;
    onSubmit: () => void;
    onSwitchToSignUp: () => void;
    onChangePassword: () => void;
}

const SingInForm: React.FC<LoginFormProps> = (props) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [passwordValid, setPasswordValid] = useState<boolean>(true);

    useEffect(() => {
        const isValid = Boolean(
            props.data.email?.trim() && 
            props.data.password?.trim() &&
            emailValid && 
            passwordValid
        );
        setIsFormValid(isValid);
    }, [props.data, emailValid, passwordValid]);

    const handleEmailChange = (value: string, isValid?: boolean) => {
        props.onChange("email", value);
        if (isValid !== undefined) {
            setEmailValid(isValid);
        }
    };

    const handlePasswordChange = (value: string, isValid?: boolean) => {
        props.onChange("password", value);
         if (isValid !== undefined) {
            setPasswordValid(isValid);
        }
    };

    return (
        <Form onSubmit={(e: any) => e.preventDefault()}>
            <DefaultInput
                label="Email"
                type="email"
                value={props.data.email}
                validateEmail={true}
                required={true}
                onChange={handleEmailChange}
                placeholder="student@gmail.com"
                fullWidth
            />

            <DefaultInput
                label="Пароль"
                type="password"
                required={true}
                value={props.data.password}
                onChange={handlePasswordChange}
                onChangePassword={props.onChangePassword}
                placeholder="Введите пароль"
                fullWidth
                validatePassword
                isPassword
            />

            <SubmitButton 
                variant={ButtonVariant.PRIMARY} 
                onClick={props.onSubmit} 
                fullWidth 
                disabled={!isFormValid}
            >
                Войти
            </SubmitButton>

            <SwitchFormText>
                Нет аккаунта?{" "}
                <SwitchLink onClick={props.onSwitchToSignUp}>Зарегистрироваться</SwitchLink>
            </SwitchFormText>
        </Form>
    );
};

export default SingInForm;
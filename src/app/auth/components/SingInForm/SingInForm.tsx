"use client";

import React, { useEffect, useState } from "react";
import { SignIn } from "@/models/Auth";
import { DefaultInput } from "@/components/inputs";
import { Form, SubmitButton, SwitchFormText, SwitchLink } from "../../page.styles";
import { ButtonVariant } from "@/models/types";

interface LoginFormProps {
    data: SignIn;
    onChange: (field: keyof SignIn, value: string) => void;
    onSubmit: () => void;
    onSwitchToSignUp: () => void;
    onChangePassword: () => void;
}

const SingInForm: React.FC<LoginFormProps> = (props) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    useEffect(() => {
        const isValid = Boolean(props.data.email?.trim() && props.data.password?.trim());
        setIsFormValid(isValid);
    }, [props.data]);

    return (
        <Form onSubmit={(e: any) => e.preventDefault()}>
            <DefaultInput
                label="Email"
                type="email"
                value={props.data.email}
                validateEmail={true}
                required={true}
                onChange={(value) => props.onChange("email", value)}
                placeholder="student@gmail.com"
                fullWidth
            />

            <DefaultInput
                label="Пароль"
                type="password"
                required={true}
                value={props.data.password}
                onChange={(value) => props.onChange("password", value)}
                onChangePassword={props.onChangePassword}
                placeholder="Введите пароль"
                fullWidth
                isPassword
            />

            <SubmitButton variant={ButtonVariant.PRIMARY} onClick={props.onSubmit} fullWidth disabled={!isFormValid}>
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

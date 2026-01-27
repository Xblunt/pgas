"use client";

import React, { useState, useEffect } from "react";
import { CreateUser } from "@/models/User";
import { DefaultInput } from "@/components/inputs";
import { Form, SubmitButton, SwitchFormText, SwitchLink } from "../../page.styles";
import { ButtonVariant } from "@/models/types";

interface SignUpFormProps {
    data: CreateUser;
    onChange: (field: keyof CreateUser, value: string) => void;
    onSubmit: () => void;
    onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = Boolean(
            props.data.name?.trim() &&
            props.data.second_name?.trim() &&
            props.data.email?.trim() &&
            props.data.password?.trim() &&
            props.data.phone_number?.trim() &&
            props.data.birth_date?.trim() &&
            props.data.gradebook_number?.trim()
        );

        setIsFormValid(isValid);
    }, [props.data]);

    return (
        <Form onSubmit={(e: any) => e.preventDefault()}>
            <DefaultInput
                label="Имя"
                value={props.data.name}
                onChange={(value) => props.onChange("name", value)}
                placeholder="Введите имя"
                fullWidth
                required
            />

            <DefaultInput
                label="Фамилия"
                value={props.data.second_name}
                onChange={(value) => props.onChange("second_name", value)}
                placeholder="Введите фамилию"
                fullWidth
                required
            />

            <DefaultInput
                label="Отчество"
                value={props.data.patronymic}
                onChange={(value) => props.onChange("patronymic", value)}
                placeholder="Введите отчество"
                fullWidth
            />

            <DefaultInput
                label="Номер зачётной книжки"
                value={props.data.gradebook_number}
                onChange={(value) =>props. onChange("gradebook_number", value)}
                placeholder="Введите номер зачётной книжки"
                fullWidth
                required
            />

            <DefaultInput
                label="Дата рождения"
                value={props.data.birth_date}
                onChange={(value) => props.onChange("birth_date", value)}
                placeholder="dd.mm.yyyy"
                fullWidth
                mask="date"
                required
            />

            <DefaultInput
                label="Email"
                type="email"
                value={props.data.email}
                validateEmail={true}
                onChange={(value) => props.onChange("email", value)}
                placeholder="example@email.com"
                fullWidth
                required
            />

            <DefaultInput
                label="Номер телефона"
                value={props.data.phone_number}
                onChange={(value) => props.onChange("phone_number", value)}
                placeholder="+7 (___) ___-__-__"
                fullWidth
                mask="phone"
                required
            />

            <DefaultInput
                label="Пароль"
                type="password"
                value={props.data.password}
                onChange={(value) => props.onChange("password", value)}
                placeholder="Введите пароль"
                fullWidth
                hideChangePassword
                isPassword
                required
            />

            <SubmitButton variant={ButtonVariant.PRIMARY} onClick={props.onSubmit} fullWidth disabled={!isFormValid}>
                Зарегистрироваться
            </SubmitButton>

            <SwitchFormText>
                Уже есть аккаунт? <SwitchLink onClick={props.onSwitchToLogin}>Войти</SwitchLink>
            </SwitchFormText>
        </Form>
    );
};

export default SignUpForm;
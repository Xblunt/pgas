"use client";

import React, { useState, useEffect } from "react";
import { CreateUser } from "@/models/User";
import { DefaultInput } from "@/components/inputs";
import { Form, SubmitButton, SwitchFormText, SwitchLink } from "../../page.styles";

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
                                                   onSwitchToLogin,
                                               }) => {
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = Boolean(
            data.name?.trim() &&
            data.second_name?.trim() &&
            data.email?.trim() &&
            data.password?.trim() &&
            data.phone_number?.trim() &&
            data.birth_date?.trim() &&
            data.gradebook_number?.trim()
        );

        setIsFormValid(isValid);
    }, [data]);

    return (
        <Form onSubmit={(e: any) => e.preventDefault()}>
            <DefaultInput
                label="Имя"
                value={data.name}
                onChange={(value) => onChange("name", value)}
                placeholder="Введите имя"
                fullWidth
                required
            />

            <DefaultInput
                label="Фамилия"
                value={data.second_name}
                onChange={(value) => onChange("second_name", value)}
                placeholder="Введите фамилию"
                fullWidth
                required
            />

            <DefaultInput
                label="Отчество"
                value={data.patronymic}
                onChange={(value) => onChange("patronymic", value)}
                placeholder="Введите отчество"
                fullWidth
            />

            <DefaultInput
                label="Номер зачётной книжки"
                value={data.gradebook_number}
                onChange={(value) => onChange("gradebook_number", value)}
                placeholder="Введите номер зачётной книжки"
                fullWidth
                required
            />

            <DefaultInput
                label="Дата рождения"
                value={data.birth_date}
                onChange={(value) => onChange("birth_date", value)}
                placeholder="dd.mm.yyyy"
                fullWidth
                mask="date"
                required
            />

            <DefaultInput
                label="Email"
                type="email"
                value={data.email}
                validateEmail={true}
                onChange={(value) => onChange("email", value)}
                placeholder="example@email.com"
                fullWidth
                required
            />

            <DefaultInput
                label="Номер телефона"
                value={data.phone_number}
                onChange={(value) => onChange("phone_number", value)}
                placeholder="+7 (___) ___-__-__"
                fullWidth
                mask="phone"
                required
            />

            <DefaultInput
                label="Пароль"
                type="password"
                value={data.password}
                onChange={(value) => onChange("password", value)}
                placeholder="Введите пароль"
                fullWidth
                isPassword
                required
            />

            <SubmitButton variant="primary" onClick={onSubmit} fullWidth disabled={!isFormValid}>
                Зарегистрироваться
            </SubmitButton>

            <SwitchFormText>
                Уже есть аккаунт? <SwitchLink onClick={onSwitchToLogin}>Войти</SwitchLink>
            </SwitchFormText>
        </Form>
    );
};

export default SignUpForm;
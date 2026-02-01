"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/models/User";
import { DefaultInput } from "@/components/inputs";
import { Form, SubmitButton, SwitchFormText, SwitchLink } from "../../page.styles";
import { ButtonVariant } from "@/models/types";
import { FormLoader } from "@/components/loader/FormLoader";

interface SignUpFormProps {
    data: User;
    loading?: boolean;
    onChange: (field: keyof User, value: string, isValid?: boolean) => void;
    onSubmit: () => void;
    onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [validFields, setValidFields] = useState({
        email: true,
        phone: true,
        date: true,
        password: true
    });

    useEffect(() => {
        const allFilled = Boolean(
            props.data.name?.trim() &&
            props.data.second_name?.trim() &&
            props.data.email?.trim() &&
            props.data.password?.trim() &&
            props.data.phone_number?.trim() &&
            props.data.birth_date?.trim() &&
            props.data.gradebook_number?.trim()
        );

        const allValid = validFields.email && validFields.phone && validFields.date && validFields.password;

        setIsFormValid(allFilled && allValid);
    }, [props.data, validFields]);

    const handleFieldChange = (field: keyof User, value: string, isValid?: boolean) => {
        props.onChange(field, value);
        
        if (field === 'email' && isValid !== undefined) {
            setValidFields(prev => ({ ...prev, email: isValid }));
        }
        if (field === 'phone_number' && isValid !== undefined) {
            setValidFields(prev => ({ ...prev, phone: isValid }));
        }
        if (field === 'birth_date' && isValid !== undefined) {
            setValidFields(prev => ({ ...prev, date: isValid }));
        }
        if (field === 'password' && isValid !== undefined) {
            setValidFields(prev => ({ ...prev, password: isValid }));
        }
    };

    return (
        <Form onSubmit={(e: any) => e.preventDefault()}>

             {props.loading ? (
                <FormLoader />
            ) : (
                <>
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
                        onChange={(value) => props.onChange("gradebook_number", value)}
                        placeholder="Введите номер зачётной книжки"
                        fullWidth
                        required
                    />

                    <DefaultInput
                        label="Дата рождения"
                        value={props.data.birth_date}
                        onChange={(value, isValid) => handleFieldChange("birth_date", value, isValid)}
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
                        onChange={(value, isValid) => handleFieldChange("email", value, isValid)}
                        placeholder="example@email.com"
                        fullWidth
                        required
                    />

                    <DefaultInput
                        label="Номер телефона"
                        value={props.data.phone_number}
                        onChange={(value, isValid) => handleFieldChange("phone_number", value, isValid)}
                        placeholder="+7 (___) ___-__-__"
                        fullWidth
                        mask="phone"
                        required
                    />

                    <DefaultInput
                        label="Пароль"
                        type="password"
                        value={props.data.password}
                        onChange={(value, isValid) => handleFieldChange("password", value, isValid)}
                        placeholder="Введите пароль"
                        fullWidth
                        validatePassword
                        hideChangePassword
                        isPassword
                        required
                    />

                    <SubmitButton 
                        variant={ButtonVariant.PRIMARY} 
                        onClick={props.onSubmit} 
                        fullWidth 
                        disabled={!isFormValid}
                    >
                        Зарегистрироваться
                    </SubmitButton>

                    <SwitchFormText>
                        Уже есть аккаунт? <SwitchLink onClick={props.onSwitchToLogin}>Войти</SwitchLink>
                    </SwitchFormText>
                </>
            )}
        </Form>
    );
};

export default SignUpForm;
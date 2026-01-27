"use client"

import Modal from "@/components/modal";
import { ButtonVariant } from "@/models/types";
import React from "react";
import { useState, useEffect } from "react";
import { DefaultInput } from "@/components/inputs";

export type ChangePasswordData = {
    newPassword: string;
    confirmPassword: string;
    email?: string;
};

export type Props = {
    email?: string;
    onClose: () => void;
    onSave: (newPassword: string, email?: string) => void;
};

const ChangePasswordForm: React.FC<Props> = (props) => {
    const [formData, setFormData] = useState<ChangePasswordData>({
        newPassword: '',
        confirmPassword: '',
        email: props.email
    });
    const [error, setError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    useEffect(() => {
        if (formData.newPassword  &&  formData.confirmPassword && formData.newPassword !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        setError('');
    }, [formData.newPassword, formData.confirmPassword]);

    const handleFieldChange = (field: keyof ChangePasswordData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        if (error) {
            return;
        }

        if (props.email && !formData.email?.trim()) {
            setEmailError('Заполните электронную почту');
            return;
        }

        if (!formData.newPassword.trim() || !formData.confirmPassword.trim()) {
            setError('Заполните оба поля');
            return;
        }

        if (formData.newPassword  &&  formData.confirmPassword && formData.newPassword !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        props.onSave(formData.newPassword, formData.email);
    };


    const isSaveDisabled = !!error || !!emailError ||
                         !formData.newPassword.trim() || 
                         (props.email && !formData.email?.trim()) || 
                         !formData.confirmPassword.trim() ||
                         formData.newPassword !== formData.confirmPassword;

    return (
        <Modal
            title="Сменить пароль"
            fullWidth
            maxWidth={480}
            buttons={[
                { 
                    text: "Закрыть", 
                    variant: ButtonVariant.OUTLINE, 
                    onClick: props.onClose  
                },
                { 
                    text: "Сменить", 
                    disabled: isSaveDisabled,
                    variant: ButtonVariant.PRIMARY, 
                    onClick: handleSave  
                },
            ]}
        >
            <div className="form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {props.email && 
                    <DefaultInput
                        label="Email"
                        type="email"
                        value={props.email}
                        validateEmail={true}
                        required={true}
                        error={emailError}
                        onChange={(value) => handleFieldChange("email", value)}
                        placeholder="student@gmail.com"
                        fullWidth
                    />
                }

                <DefaultInput
                    label="Новый пароль"
                    type="password"
                    required={true}
                    value={formData.newPassword}
                    onChange={(value) => handleFieldChange("newPassword", value)}
                    placeholder="Введите новый пароль"
                    fullWidth
                    hideChangePassword
                    isPassword
                    error={error}
                />
                
                <DefaultInput
                    label="Повторить новый пароль"
                    type="password"
                    required={true}
                    value={formData.confirmPassword}
                    onChange={(value) => handleFieldChange("confirmPassword", value)}
                    placeholder="Повторите новый пароль"
                    fullWidth
                    hideChangePassword
                    isPassword
                    error={error}
                />
            </div>
        </Modal>
    );
};

export default ChangePasswordForm;
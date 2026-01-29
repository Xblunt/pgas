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
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<ChangePasswordData>({
        newPassword: '',
        confirmPassword: '',
        email: props.email
    });
    const [error, setError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [fieldValidity, setFieldValidity] = useState({
        email: true,
        newPassword: true,
        confirmPassword: true,
    });

    useEffect(() => {
        if (formData.newPassword  &&  formData.confirmPassword && formData.newPassword !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        setError('');
    }, [formData.newPassword, formData.confirmPassword]);

    const handleFieldChange = (field: keyof ChangePasswordData, value: string, isValid?: boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        if (isValid !== undefined) {
            setFieldValidity(prev => ({
                ...prev,
                [field]: isValid
            }));
        }
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

        setLoading(true);

        props.onSave(formData.newPassword, formData.email);
    };

    const isSaveDisabled = !!error || !!emailError ||
                         !formData.newPassword.trim() || 
                         (props.email && !formData.email?.trim()) || 
                         !formData.confirmPassword.trim() ||
                         formData.newPassword !== formData.confirmPassword ||
                         (props.email && !fieldValidity.email) ||
                         !fieldValidity.newPassword ||
                         !fieldValidity.confirmPassword;

    return (
        <Modal
            title="Сменить пароль"
            fullWidth
            loading={loading}
            maxWidth={480}
            onClose={props.onClose}
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
                        value={formData.email || ''}
                        validateEmail={true}
                        required={true}
                        error={emailError}
                        onChange={(value, isValid) => handleFieldChange("email", value, isValid)}
                        placeholder="student@gmail.com"
                        fullWidth
                    />
                }

                <DefaultInput
                    label="Новый пароль"
                    type="password"
                    required={true}
                    value={formData.newPassword}
                    onChange={(value, isValid) => handleFieldChange("newPassword", value, isValid)}
                    placeholder="Введите новый пароль"
                    fullWidth
                    validatePassword
                    hideChangePassword
                    isPassword
                    error={error}
                />
                
                <DefaultInput
                    label="Повторить новый пароль"
                    type="password"
                    required={true}
                    validatePassword
                    value={formData.confirmPassword}
                    onChange={(value, isValid) => handleFieldChange("confirmPassword", value, isValid)}
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
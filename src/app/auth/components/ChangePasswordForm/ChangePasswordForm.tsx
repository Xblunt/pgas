"use client"

import Modal from "@/components/modal";
import { ButtonVariant } from "@/models/types";
import React from "react";
import { useState, useEffect } from "react";
import { DefaultInput } from "@/components/inputs";
import { AuthService } from "@/services";
import { useToast } from "@/app/ToastProvider";

export type ChangePasswordData = {
    newPassword: string;
    confirmPassword: string;
};

export type Props = {
    onClose: () => void;
};

const ChangePasswordForm: React.FC<Props> = (props) => {
    const authService = AuthService.getInstance();
    const { showToast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<ChangePasswordData>({
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string>('');
    const [numError, setNumError] = useState<string>('');
    const [fieldValidity, setFieldValidity] = useState({
        newPassword: true,
        confirmPassword: true,
    });

    useEffect(() => {
        if (formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword) {
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
        
        if (field === 'newPassword' || field === 'confirmPassword') {
            if (isValid !== undefined) {
                setFieldValidity(prev => ({
                    ...prev,
                    [field]: isValid
                }));
            }
        }
    };

    const handleSave = async () => {
        if (error || numError) return;

        if (!formData.newPassword.trim() || !formData.confirmPassword.trim()) {
            setError('Заполните оба поля');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        setLoading(true);

        try {
            await authService.changePassword(formData.newPassword);
            showToast('Пароль успешно изменен', 'success');
            props.onClose();
        } finally {
            setLoading(false);
        }
    };

    const isSaveDisabled = 
        !!error ||
        !!numError ||
        !formData.newPassword.trim() ||
        !formData.confirmPassword.trim() ||
        formData.newPassword !== formData.confirmPassword ||
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
            <div className="form">
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
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DefaultInput } from "@/components/inputs";
import { CreateUser } from "@/models/User";
import { Card, FormGrid } from "./page.styles";
import Toolbar from "@/components/toolbar/Toolbar";
import { ButtonVariant } from "@/models/types";
import { ChangePasswordForm } from "../auth/components";

const STORAGE_KEY = "pgas_profile";

const emptyProfile: CreateUser = {
    name: "",
    second_name: "",
    patronymic: "",
    gradebook_number: "",
    birth_date: "",
    email: "",
    phone_number: "",
    password: "",
};

const ProfilePage: React.FC = () => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [profile, setProfile] = useState<CreateUser>({ ...emptyProfile });
    const [snapshot, setSnapshot] = useState<CreateUser>({ ...emptyProfile });
    const [viewChangePasswordForm, setViewChangePasswordForm] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            setProfile({ ...emptyProfile });
            setSnapshot({ ...emptyProfile });
            return;
        }

        try {
            const parsed = JSON.parse(raw) as Partial<CreateUser>;
            const merged: CreateUser = {
                ...emptyProfile,
                ...parsed,
            };
            setProfile(merged);
            setSnapshot(merged);
        } catch {
            setProfile({ ...emptyProfile });
            setSnapshot({ ...emptyProfile });
        }
    }, []);

    const handleChange = (field: keyof CreateUser, value: string) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const hasRequiredFilled = useMemo(() => {
        return Boolean(
            profile.name.trim() &&
            profile.second_name.trim() &&
            profile.email.trim() &&
            profile.phone_number.trim() &&
            profile.birth_date.trim() &&
            profile.gradebook_number.trim() &&
            profile.password.trim()
        );
    }, [profile]);

    const handleEdit = () => {
        setSnapshot(profile);
        setIsEditMode(true);
    };

    const handleCancel = () => {
        setProfile(snapshot);
        setIsEditMode(false);
    };

    const handleSave = () => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
        }
        setSnapshot(profile);
        setIsEditMode(false);
    };

    const disabled = !isEditMode;

    const toolbarButtons = useMemo(() => {
        if (isEditMode) {
            return [
                {
                    text: "Отменить",
                    variant: ButtonVariant.OUTLINE,
                    onClick: handleCancel,
                },
                {
                    text: "Сохранить",
                    variant: ButtonVariant.PRIMARY,
                    onClick: handleSave,
                    disabled: !hasRequiredFilled,
                },
            ];
        } else {
            return [
                {
                    text: "Редактировать",
                    variant: ButtonVariant.PRIMARY,
                    onClick: handleEdit,
                },
            ];
        }
    }, [isEditMode, hasRequiredFilled]);

    const handleChangePassword = (newPassword: string) => {
        setViewChangePasswordForm(false);
        console.log("newPassword", newPassword);
    }


    return (
        <div className="page">
            <Toolbar 
                title="Личный кабинет" 
                buttons={toolbarButtons}
            />
            <Card>
                <FormGrid>
                    <DefaultInput
                        label="Имя"
                        value={profile.name}
                        onChange={(value) => handleChange("name", value)}
                        placeholder="Введите имя"
                        fullWidth
                        required
                        disabled={disabled}
                    />

                    <DefaultInput
                        label="Фамилия"
                        value={profile.second_name}
                        onChange={(value) => handleChange("second_name", value)}
                        placeholder="Введите фамилию"
                        fullWidth
                        required
                        disabled={disabled}
                    />

                    <DefaultInput
                        label="Отчество"
                        value={profile.patronymic}
                        onChange={(value) => handleChange("patronymic", value)}
                        placeholder="Введите отчество"
                        fullWidth
                        disabled={disabled}
                    />

                    <DefaultInput
                        label="Номер зачётной книжки"
                        value={profile.gradebook_number}
                        onChange={(value) => handleChange("gradebook_number", value)}
                        placeholder="Введите номер зачётной книжки"
                        fullWidth
                        required
                        disabled={disabled}
                    />

                    <DefaultInput
                        label="Дата рождения"
                        value={profile.birth_date}
                        onChange={(value) => handleChange("birth_date", value)}
                        placeholder="dd.mm.yyyy"
                        fullWidth
                        mask="date"
                        required
                        disabled={disabled}
                    />

                    <DefaultInput
                        label="Email"
                        type="email"
                        value={profile.email}
                        validateEmail={true}
                        onChange={(value) => handleChange("email", value)}
                        placeholder="example@email.com"
                        fullWidth
                        required
                        disabled={disabled}
                    />

                    <DefaultInput
                        label="Номер телефона"
                        value={profile.phone_number}
                        onChange={(value) => handleChange("phone_number", value)}
                        placeholder="+7 (___) ___-__-__"
                        fullWidth
                        mask="phone"
                        required
                        disabled={disabled}
                    />

                    <DefaultInput
                        label="Пароль"
                        type="password"
                        value={profile.password}
                        onChange={(value) => handleChange("password", value)}
                        placeholder="Введите пароль"
                        fullWidth
                        onChangePassword={() => setViewChangePasswordForm(true)}
                        hideViewPassword
                        hideChangePassword={disabled}
                        isPassword
                        required
                        disabled={true}
                    />
                </FormGrid>

            </Card>
            {viewChangePasswordForm && <ChangePasswordForm onClose={() => setViewChangePasswordForm(false)} onSave={handleChangePassword} />}
        </div>
    );
};

export default ProfilePage;

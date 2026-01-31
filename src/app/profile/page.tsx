"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DefaultInput } from "@/components/inputs";
import { CreateUser } from "@/models/User";
import { Card, FormGrid } from "./page.styles";
import Toolbar from "@/components/toolbar/Toolbar";
import { ButtonVariant } from "@/models/types";
import { ChangePasswordForm } from "../auth/components";
import Loader from "@/components/loader";
import { useStores } from "@/hooks/useStores";
import { useToast } from "../ToastProvider";
import { observer } from "mobx-react-lite";

const emptyProfile: CreateUser = {
    name: "",
    email: "",
    phone_number: "",
    second_name: "",
    patronymic: "",
    gradebook_number: "",
    birth_date: "",
    password: "",
};

const ProfilePage: React.FC = () => {
    const { profileStore, authStore } = useStores();
    const { showToast } = useToast();

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [profile, setProfile] = useState<CreateUser>({ ...emptyProfile });
    const [snapshot, setSnapshot] = useState<CreateUser>({ ...emptyProfile });
    const [viewChangePasswordForm, setViewChangePasswordForm] = useState<boolean>(false);

    const [validFields, setValidFields] = useState({
        email: true,
        phone: true,
        date: true,
    });

    useEffect(() => {
        profileStore.loadMe();
    }, [profileStore]);

    useEffect(() => {
        if (!profileStore.profile) return;
        if (isEditMode) return;

        const merged: CreateUser = {
            ...emptyProfile,
            name: profileStore.profile.name || "",
            second_name: profileStore.profile.second_name || "",
            patronymic: profileStore.profile.patronymic || "",
            gradebook_number: profileStore.profile.gradebook_number || "",
            birth_date: profileStore.profile.birth_date || "",
            email: profileStore.profile.email || "",
            phone_number: profileStore.profile.phone_number || "",
            password: "",
        };

        setProfile(merged);
        setSnapshot(merged);

        setValidFields({
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(merged.email),
            phone: merged.phone_number.length === 18,
            date: merged.birth_date.length === 10,
        });
    }, [profileStore.profile, isEditMode]);

    const handleChange = (field: keyof CreateUser, value: string, isValid?: boolean) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === "email" && isValid !== undefined) {
            setValidFields((prev) => ({ ...prev, email: isValid }));
        }
        if (field === "phone_number" && isValid !== undefined) {
            setValidFields((prev) => ({ ...prev, phone: isValid }));
        }
        if (field === "birth_date" && isValid !== undefined) {
            setValidFields((prev) => ({ ...prev, date: isValid }));
        }
    };

    const hasRequiredFilled = useMemo(() => {
        return Boolean(
            profile.name.trim() &&
            profile.second_name.trim() &&
            profile.gradebook_number.trim() &&
            profile.email.trim() &&
            profile.phone_number.trim() &&
            profile.birth_date.trim()
        );
    }, [profile]);

    const allValidFields = useMemo(() => {
        return validFields.email && validFields.phone && validFields.date;
    }, [validFields]);

    const canSave = hasRequiredFilled && allValidFields;

    const handleEdit = () => {
        setSnapshot(profile);
        setIsEditMode(true);
    };

    const handleCancel = () => {
        setProfile(snapshot);
        setIsEditMode(false);
        setValidFields({
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(snapshot.email),
            phone: snapshot.phone_number.length === 18,
            date: snapshot.birth_date.length === 10,
        });
    };

    const handleSave = async () => {
        await profileStore.updateMe(profile);
        setIsEditMode(false);
        showToast("Профиль обновлён", "success");
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
                    disabled: !canSave,
                },
            ];
        }
        return [
            {
                text: "Редактировать",
                variant: ButtonVariant.PRIMARY,
                onClick: handleEdit,
            },
        ];
    }, [isEditMode, canSave, handleCancel, handleSave]);

    const handleChangePassword = async (newPassword: string) => {
        await authStore.changePassword(newPassword);
        setViewChangePasswordForm(false);
        showToast("Пароль успешно изменён", "success");
    };

    if (!profileStore.isLoaded || profileStore.isLoading) return <Loader />;

    return (
        <div className="page">
            <Toolbar title="Личный кабинет" buttons={toolbarButtons} />

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
                        onChange={(value, isValid) => handleChange("birth_date", value, isValid)}
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
                        onChange={(value, isValid) => handleChange("email", value, isValid)}
                        placeholder="example@email.com"
                        fullWidth
                        required
                        disabled={disabled}
                    />

                    <DefaultInput
                        label="Номер телефона"
                        value={profile.phone_number}
                        onChange={(value, isValid) => handleChange("phone_number", value, isValid)}
                        placeholder="+7 (___) ___-__-__"
                        fullWidth
                        mask="phone"
                        required
                        disabled={disabled}
                    />

                    <DefaultInput
                        label="Пароль"
                        type="password"
                        value="********"
                        onChange={() => {}}
                        placeholder="********"
                        fullWidth
                        onChangePassword={() => setViewChangePasswordForm(true)}
                        hideViewPassword
                        hideChangePassword={disabled}
                        isPassword
                        disabled={true}
                    />
                </FormGrid>
            </Card>

            {viewChangePasswordForm && (
                <ChangePasswordForm onClose={() => setViewChangePasswordForm(false)} onSave={handleChangePassword} />
            )}
        </div>
    );
};

export default observer(ProfilePage);

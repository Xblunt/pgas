"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DefaultInput } from "@/components/inputs";
import { CreateUser } from "@/models/User";
import {
    ActionButton,
    Card,
    FooterHint,
    FormGrid,
    ProfilePageContainer,
    Toolbar,
    ToolbarActions,
    ToolbarTitle,
} from "./page.styles";

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
    const [isEditMode, setIsEditMode] = useState(false);
    const [profile, setProfile] = useState<CreateUser>({ ...emptyProfile });
    const [snapshot, setSnapshot] = useState<CreateUser>({ ...emptyProfile });

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

    return (
        <ProfilePageContainer>
            <Toolbar>
                <ToolbarTitle>Личный кабинет</ToolbarTitle>

                <ToolbarActions>
                    {isEditMode && (
                        <ActionButton variant="outline" size="medium" onClick={handleCancel}>
                            Отменить
                        </ActionButton>
                    )}

                    {!isEditMode ? (
                        <ActionButton variant="primary" size="medium" onClick={handleEdit}>
                            Редактировать
                        </ActionButton>
                    ) : (
                        <ActionButton
                            variant="primary"
                            size="medium"
                            onClick={handleSave}
                            disabled={!hasRequiredFilled}
                        >
                            Сохранить
                        </ActionButton>
                    )}
                </ToolbarActions>
            </Toolbar>

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
                        isPassword
                        required
                        disabled={disabled}
                    />
                </FormGrid>

            </Card>
        </ProfilePageContainer>
    );
};

export default ProfilePage;

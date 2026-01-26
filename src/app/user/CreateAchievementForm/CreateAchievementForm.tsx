"use client";

import React, { useMemo, useRef } from "react";
import { DefaultInput, DropdownInput, TextareaInput } from "@/components/inputs";
import { FormContainer, FileRow, FileButton, HiddenFileInput } from "./CreateAchievementForm.styles";
import { ButtonVariant, ButtonSize } from "@/models/types";
import Modal from "@/components/modal";

export type AchievementFormState = {
    category: string;
    subcategory: string;
    place: string;
    participants: number;
    preliminaryPoints: number;
    actualPoints: number;
    status: string;
    publicationDate: string;
    file: File | null;
    fileName: string;
    link: string;
    description: string;
};

export interface CreateAchievementFormProps {
    value: AchievementFormState;
    onChange: (patch: Partial<AchievementFormState>) => void;
    categoryDisabled?: boolean;
    preliminaryDisabled?: boolean;
    actualDisabled?: boolean;
    title: string;
    onClose: () => void;
    onSave: () => void;
}

const subcategoryOptions = [
    { value: "vak", label: "ВАК" },
    { value: "scopus", label: "Scopus" },
    { value: "wos", label: "Web of Science" },
];

const placeOptions = [
    { value: "none", label: "Без места" },
    { value: "1", label: "1 место" },
    { value: "2", label: "2 место" },
    { value: "3", label: "3 место" },
];

const participantsOptions = Array.from({ length: 10 }).map((_, i) => ({
    value: i + 1,
    label: String(i + 1),
}));

const statusOptions = [
    { value: "draft", label: "Черновик" },
    { value: "pending", label: "На рассмотрении" },
    { value: "approved", label: "Подтверждено" },
    { value: "rejected", label: "Отклонено" },
];

const CreateAchievementForm: React.FC<CreateAchievementFormProps> = (props) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const selectedSubcategoryLabel = useMemo(() => {
        return subcategoryOptions.find((o) => o.value === props.value.subcategory)?.label || "";
    }, [props.value.subcategory]);

    const selectedPlaceLabel = useMemo(() => {
        return placeOptions.find((o) => o.value === props.value.place)?.label || "";
    }, [props.value.place]);

    const selectedStatusLabel = useMemo(() => {
        return statusOptions.find((o) => o.value === props.value.status)?.label || "";
    }, [props.value.status]);

    const handlePickFile = () => {
        if (fileRef.current) fileRef.current.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] || null;
        props.onChange({
            file: f,
            fileName: f ? f.name : "",
        });
    };

    return (
        <Modal
            title={props.title}
            fullWidth
            maxWidth={640}
            buttons={[
                { text: "Закрыть", variant: ButtonVariant.OUTLINE, onClick: props.onClose },
                { text: "Сохранить", variant: ButtonVariant.PRIMARY, onClick: props.onSave },
            ]}
        >
            <FormContainer>
                <DefaultInput
                    label="Категория"
                    value={props.value.category}
                    onChange={(v) => props.onChange({ category: v })}
                    fullWidth
                    disabled={!!props.categoryDisabled}
                />

                <DropdownInput
                    label="Подкатегория"
                    value={props.value.subcategory}
                    options={subcategoryOptions}
                    fullWidth
                    placeholder="Выберите..."
                    onChange={(v) => props.onChange({ subcategory: String(v) })}
                />

                <DropdownInput
                    label="Какое место"
                    value={props.value.place}
                    options={placeOptions}
                    fullWidth
                    placeholder="Выберите..."
                    onChange={(v) => props.onChange({ place: String(v) })}
                />

                <DropdownInput
                    label="Кол-во участников"
                    value={props.value.participants}
                    options={participantsOptions}
                    fullWidth
                    placeholder="Выберите..."
                    onChange={(v) => props.onChange({ participants: Number(v) })}
                />

                <DefaultInput
                    label="Предварительное кол-во баллов"
                    value={String(props.value.preliminaryPoints)}
                    onChange={(v) => props.onChange({ preliminaryPoints: Number(v) || 0 })}
                    fullWidth
                    disabled={!!props.preliminaryDisabled}
                />

                <DefaultInput
                    label="Фактическое кол-во баллов"
                    value={String(props.value.actualPoints)}
                    onChange={(v) => props.onChange({ actualPoints: Number(v) || 0 })}
                    fullWidth
                    disabled={!!props.actualDisabled}
                />

                <DropdownInput
                    label="Статус"
                    value={props.value.status}
                    options={statusOptions}
                    fullWidth
                    placeholder="Выберите..."
                    onChange={(v) => props.onChange({ status: String(v) })}
                />

                <DefaultInput
                    label="Дата публикации"
                    value={props.value.publicationDate}
                    onChange={(v) => props.onChange({ publicationDate: v })}
                    placeholder="dd.mm.yyyy"
                    fullWidth
                    mask="date"
                />

                <FileRow>
                    <DefaultInput
                        label="Файл"
                        value={props.value.fileName}
                        onChange={() => {}}
                        placeholder="Выберите файл"
                        fullWidth
                        disabled
                    />
                    <FileButton variant={ButtonVariant.OUTLINE} size={ButtonSize.MEDIUM} onClick={handlePickFile}>
                        Выбрать
                    </FileButton>
                    <HiddenFileInput ref={fileRef} type="file" onChange={handleFileChange} />
                </FileRow>

                <DefaultInput
                    label="Ссылка на документы (Yandex Диск и тд)"
                    value={props.value.link}
                    onChange={(v) => props.onChange({ link: v })}
                    placeholder="https://..."
                    fullWidth
                />

                <TextareaInput
                    label="Описание"
                    value={props.value.description}
                    onChange={(v) => props.onChange({ description: v })}
                    fullWidth
                    rows={4}
                    placeholder="Введите описание"
                />
            </FormContainer>
        </Modal>
    );
};

export default CreateAchievementForm;

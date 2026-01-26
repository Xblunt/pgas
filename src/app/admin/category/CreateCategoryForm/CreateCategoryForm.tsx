import Modal from "@/components/modal";
import { ButtonVariant } from "@/models/types";
import React from "react";
import { useState } from "react";
import { FormContainer } from "@/app/user/CreateAchievementForm/CreateAchievementForm.styles";
import { DefaultInput, NumberInput } from "@/components/inputs";

export type Props = {
    category?: any;
    onClose: () => void;
    onSave: (category: any) => void
};

const CreateCategoryForm: React.FC<Props> = (props) => {
    const [data, setData] = useState<any | null>(
        props.category || { name: '', points: 0 }
    )

    const handleChange = (field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        props.onSave(data);
    };

    return (
        <Modal
            title={`${!!props.category ? 'Редактировать' : 'Добавить'} категорию`}
            fullWidth
            maxWidth={640}
            buttons={[
                { text: "Закрыть", variant: ButtonVariant.OUTLINE, onClick: props.onClose  },
                { text: "Сохранить", disabled: !data.name, variant: ButtonVariant.PRIMARY, onClick: handleSave  },
            ]}
        >

            <FormContainer>
                <DefaultInput
                    label="Название"
                    value={data.name || ''}
                    onChange={(value) => handleChange('name', value)}
                    required={true}
                    fullWidth
                />
                <NumberInput
                    label="Количество баллов"
                    value={data.points || 0}
                    onChange={(value) => handleChange('points', value)}
                    fullWidth
                />
            </FormContainer>
        </Modal>
    );
};

export default CreateCategoryForm;
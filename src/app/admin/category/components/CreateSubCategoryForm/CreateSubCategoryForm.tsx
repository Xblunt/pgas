import Modal from "@/components/modal";
import { ButtonVariant, ScoreItem } from "@/models/types";
import React from "react";
import { useState } from "react";
import { DefaultInput } from "@/components/inputs";
import Score from "@/components/score";

export type Props = {
    subCategory?: any;
    onClose: () => void;
    onSave: (category: any) => void
};

const CreateSubCategoryForm: React.FC<Props> = (props) => {
    const [data, setData] = useState<any | null>(
        props.subCategory || { 
            name: '', 
            pointsItems: props.subCategory?.pointsItems || [] 
        }
    )

    const handleChange = (field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleScoreItemsChange = (items: ScoreItem[]) => {
        setData((prev: any) => ({
            ...prev,
            pointsItems: items
        }));
    };

    const handleSave = () => {
        props.onSave(data);
    };

    return (
        <Modal
            title={`${!!props.subCategory ? 'Редактировать' : 'Добавить'} подкатегорию`}
            fullWidth
            maxWidth={640}
            buttons={[
                { text: "Закрыть", variant: ButtonVariant.OUTLINE, onClick: props.onClose  },
                { text: "Сохранить", disabled: !data.name, variant: ButtonVariant.PRIMARY, onClick: handleSave  },
            ]}
        >
            <div className="form">
                <DefaultInput
                    label="Название"
                    value={data.name || ''}
                    onChange={(value) => handleChange('name', value)}
                    required={true}
                    fullWidth
                />
                <Score
                    title="Варианты ответа"
                    initialItems={data.pointsItems}
                    onItemsChange={handleScoreItemsChange}
                />
            </div>

        </Modal>
    );
};

export default CreateSubCategoryForm;
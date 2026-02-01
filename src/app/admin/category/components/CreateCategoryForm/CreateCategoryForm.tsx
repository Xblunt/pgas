import Modal from "@/components/modal";
import { ButtonVariant } from "@/models/types";
import React from "react";
import { useState } from "react";
import { DefaultInput, NumberInput } from "@/components/inputs";
import { Category } from "@/models/Category";
import { CategoryService } from "@/services";

export type Props = {
    category?: Category;
    onClose: () => void;
};

const CreateCategoryForm: React.FC<Props> = (props) => {
    const categoryService = CategoryService.getInstance();
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Category>(
        props.category || { name: '', points: 0 }
    )

    const handleChange = (field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        setLoading(true);
        
        const savePromise = props.category 
            ? categoryService.saveCategory(data)
            : categoryService.createCategory(data);
        
        savePromise
            .then(() => {
                props.onClose();
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Modal
            title={`${!!props.category ? 'Редактировать' : 'Добавить'} категорию`}
            fullWidth
            loading={loading}
            maxWidth={640}
            onClose={props.onClose}
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
                <NumberInput
                    label="Количество баллов"
                    value={data.points || 0}
                    onChange={(value) => handleChange('points', value)}
                    fullWidth
                />
            </div>
        </Modal>
    );
};

export default CreateCategoryForm;
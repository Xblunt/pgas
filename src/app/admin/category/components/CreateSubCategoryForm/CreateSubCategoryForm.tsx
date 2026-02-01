import Modal from "@/components/modal";
import { ButtonVariant, ScoreItem } from "@/models/types";
import React from "react";
import { useState } from "react";
import { DefaultInput } from "@/components/inputs";
import Score from "@/components/score";
import { SubCategory } from "@/models/Category";
import { CategoryService } from "@/services";

export type Props = {
    subCategory?: SubCategory;
    onClose: () => void;
};

const CreateSubCategoryForm: React.FC<Props> = (props) => {
    const categoryService = CategoryService.getInstance();
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<SubCategory>(
        props.subCategory || { 
            name: '', 
            values: [] 
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
            values: items
        }));
    };

    const handleSave = () => {
        setLoading(true);
        
        const savePromise = props.subCategory 
            ? categoryService.saveSubCategory(data)
            : categoryService.createSubCategory(data);
        
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
            title={`${!!props.subCategory ? 'Редактировать' : 'Добавить'} подкатегорию`}
            fullWidth
            loading={loading}
            maxWidth={640}
            onClose={props.onClose}
            buttons={[
                { text: "Закрыть", variant: ButtonVariant.OUTLINE, onClick: props.onClose  },
                { text: "Сохранить", disabled: !data?.name, variant: ButtonVariant.PRIMARY, onClick: handleSave  },
            ]}
        >
            <div className="form">
                <DefaultInput
                    label="Название"
                    value={data?.name || ''}
                    onChange={(value) => handleChange('name', value)}
                    required={true}
                    fullWidth
                />
                <Score
                    title="Варианты ответа"
                    initialItems={data?.values}
                    onItemsChange={handleScoreItemsChange}
                />
            </div>

        </Modal>
    );
};

export default CreateSubCategoryForm;
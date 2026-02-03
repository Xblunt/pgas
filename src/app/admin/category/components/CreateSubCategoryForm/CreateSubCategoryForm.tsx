import Modal from "@/components/modal";
import { ButtonVariant, ScoreItem } from "@/models/types";
import React from "react";
import { useState } from "react";
import { DefaultInput } from "@/components/inputs";
import Score from "@/components/score";
import { SubCategory } from "@/models/Category";
import { CategoryService } from "@/services";
import { observer } from "mobx-react-lite";

export type Props = {
    subCategory?: SubCategory;
    parent_uuid?: string | null;
    onClose: () => void;
    onSuccess: (categoryUuid: string) => void;
};

const CreateSubCategoryForm: React.FC<Props> = (props) => {
    const categoryService = CategoryService.getInstance();
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<SubCategory>(
        props.subCategory || { 
            name: '', 
            values: [],
            parent_uuid: props.parent_uuid || '',
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
                props.onSuccess(props.parent_uuid || '');
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

export default observer(CreateSubCategoryForm);

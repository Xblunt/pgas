"use client";

import React, { useState, useEffect } from "react";
import { useStores } from "@/hooks/useStores";
import Loader from "@/components/loader";
import { CategoryService } from "@/services";
import { Category, SubCategory } from "@/models/Category";
import { ButtonAction, ButtonVariant, DropdownBlockItem } from "@/models/types";
import { DropdownBlock } from "@/components/blocks";
import Toolbar from "@/components/toolbar";
import { CreateCategoryForm, CreateSubCategoryForm } from "./components";

const AdminCategoryPage: React.FC = () => {
    const { categoryStore } = useStores();
    const categoryService = CategoryService.getInstance();
    const [loadingUuid, setLoadingUuid] = useState<string | null>(null);

    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [subCategories, setSubCategories] = useState<Map<string, SubCategory[]>>(new Map());
    
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [addingCategory, setAddingCategory] = useState<boolean>(false);
    const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
    const [addingSubCategory, setAddingSubCategory] = useState<string | null>(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        categoryService.getCategories();
    };

    const handleCloseCategoryModal = () => {
        setEditingCategory(null)
        setAddingCategory(false);
        loadCategories();
    }

    const handleCloseSubCategoryModal = () => {
        setEditingSubCategory(null)
        setAddingSubCategory(null);
        loadCategories();
    }

    const handleToggleCategory = async (categoryUuid: string) => {
        if (expandedCategory === categoryUuid) {
            setExpandedCategory(null);
            return;
        }
        setExpandedCategory(categoryUuid);
        
        if (!subCategories.has(categoryUuid)) {
            getSubCategories(categoryUuid);
        }
    };

    const getSubCategories = async (categoryUuid: string) => {
        setLoadingUuid(categoryUuid);
        categoryService.getSubCategoriesByParentUuid(categoryUuid)
            .then((subs) =>  setSubCategories(prev => new Map(prev).set(categoryUuid, subs)))
            .finally(() => setLoadingUuid(null));
    }

    const handleAddCategory = () => {
        setAddingCategory(true);
    };

    const handleEditCategory = (categoryUuid: string) => {
        const category = categoryStore.categories.find(c => c.uuid === categoryUuid);
        if (category) {
            setEditingCategory(category);
        }
    };

    const handleEditSubCategory = (categoryUuid: string, subCategoryUuid: string) => {
        const categorySubs = subCategories.get(categoryUuid);
        if (categorySubs) {
            const subCategory = categorySubs.find(s => s.uuid === subCategoryUuid);
            if (subCategory) {
                setEditingSubCategory(subCategory);
            }
        }
    };

    const handleAddSubCategory = (categoryUuid: string) => {
        setAddingSubCategory(categoryUuid);
    };

    const handleDeleteCategory = (categoryUuid: string) => {
        categoryService.deleteCategory(categoryUuid);
    };

    const handleDeleteSubCategory = (subCategoryUuid: string, categoruUuid: string) => {
        setLoadingUuid(categoruUuid);
        categoryService.deleteSubCategory(subCategoryUuid)
            .then(() => getSubCategories(categoruUuid))
            .finally(() => setLoadingUuid(null));
    };

    const convertToDropdownItems = (subs: SubCategory[]): DropdownBlockItem[] => {
        return subs.map(sub => ({
            uuid: sub.uuid || "",
            title: sub.name,
            subtitle: sub.values?.map(v => v.name).join(", ") || "",
            points: sub.points || 0,
            tags: [],
        }));
    };

    const toolbarButtons: ButtonAction[] = [
        {
            text: "+",
            variant: ButtonVariant.PRIMARY,
            onClick: handleAddCategory,
        },
    ];

    if (categoryStore.isLoading) return <Loader />;

    return (
        <div className="page">
            <Toolbar 
                title="Категории"
                buttons={toolbarButtons}
            />
            
            {categoryStore.categories.map(category => {
                const categorySubs = subCategories.get(category.uuid || "") || [];                
                return (
                    <DropdownBlock
                        key={category.uuid}
                        title={category.name}
                        uuid={category.uuid || ""}
                        isOpen={expandedCategory === category.uuid}
                        items={convertToDropdownItems(categorySubs)}
                        onToggle={() => handleToggleCategory(category.uuid || "")}
                        onAdd={() => handleAddSubCategory(category.uuid || "")}
                        onEdit={(uuid) => handleEditSubCategory(category.uuid || '', uuid)}
                        onParentEdit={(uuid) => handleEditCategory(uuid)}
                        onDelete={(uuid) => handleDeleteSubCategory(uuid, category.uuid || '')}
                        onParentDelete={(uuid) => handleDeleteCategory(uuid)}
                        loadingUuid={loadingUuid}
                    />
                );
            })}

            {(editingCategory || addingCategory) && <CreateCategoryForm category={editingCategory || undefined} onClose={handleCloseCategoryModal}/> }
            {(editingSubCategory || addingSubCategory) && <CreateSubCategoryForm parent_uuid={addingSubCategory || null} subCategory={editingSubCategory || undefined} onClose={handleCloseSubCategoryModal}/> }
        
        </div>
    );
};

export default AdminCategoryPage;
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { DefaultInput, DropdownInput, TextareaInput } from "@/components/inputs";
import { ButtonVariant } from "@/models/types";
import Modal from "@/components/modal";
import { CreateAchievement, UpdateAndViewAchievement } from "@/models/Achievement";
import { AchievementService, UserService } from "@/services";
import { SubCategory } from "@/models/Category";

export interface CreateAchievementFormProps {
  onClose: () => void;
  categoryUuid?: string | null;
  categoryName?: string | null;
  achievementUuid?: string;
}

const CreateAchievementForm: React.FC<CreateAchievementFormProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  
  const [achievementData, setAchievementData] = useState<UpdateAndViewAchievement | null>(null);
  const [subcategoriesData, setSubcategoriesData] = useState<SubCategory[]>([]);
  
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string>("");
  const [attachmentLink, setAttachmentLink] = useState("");
  const [attachmentLinkError, setAttachmentLinkError] = useState<string>("");
  const [attachmentLinkValid, setAttachmentLinkValid] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState<string>("");
  const [commentValid, setCommentValid] = useState<boolean>(false);
  const [achievementDate, setAchievementDate] = useState("");
  const [achievementDateError, setAchievementDateError] = useState<string>("");
  const [achievementDateValid, setAchievementDateValid] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [selectedSubcategoryValues, setSelectedSubcategoryValues] = useState<Record<string, string>>({});
  const [selectedSubcategoryPoints, setSelectedSubcategoryPoints] = useState<Record<string, number>>({});

  const achievmentService = AchievementService.getInstance();
  const userService = UserService.getInstance();

  const calculateTotalPoints = useCallback((
    pointsMap: Record<string, number>
  ) => {
    const total = Object.values(pointsMap).reduce((sum, points) => sum + points, 0);
    setTotalPoints(total);
  }, []);

  useEffect(() => {
    const checkFormValidity = () => {
      const isAttachmentLinkValid = attachmentLinkValid && attachmentLink.trim().length > 0;
      const isDateValid = achievementDateValid && achievementDateError === "" && achievementDate.trim().length === 10;
      const isCommentValid = commentValid && comment.trim().length > 0;
      
      const allSubcategoriesFilled = subcategoriesData.every(sub => {
        const value = selectedSubcategoryValues[sub.uuid || ''];
        return value && value.trim().length > 0;
      });
      
      const hasSubcategories = subcategoriesData.length > 0;
      
      const isValid = isAttachmentLinkValid && 
                     isDateValid && 
                     isCommentValid && 
                     allSubcategoriesFilled && 
                     hasSubcategories;
      
      setIsFormValid(isValid);
    };
    
    checkFormValidity();
  }, [
    attachmentLink, 
    attachmentLinkValid, 
    achievementDate, 
    achievementDateValid, 
    achievementDateError, 
    comment,
    commentValid,
    selectedSubcategoryValues, 
    subcategoriesData
  ]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (props.achievementUuid) {
          setIsCreating(false);
          const data = await achievmentService.getAchievementById(props.achievementUuid);
          setAchievementData(data);
          
          setName(data.category.name);
          setAttachmentLink(data.attachment_link);
          setAttachmentLinkValid(true);
          setComment(data.comment || "");
          setCommentValid(true);
          setAchievementDate(data.achievement_date);
          setAchievementDateValid(true);
          setStatus(data.status || "");
          
          const selectedValues: Record<string, string> = {};
          const selectedPoints: Record<string, number> = {};
          let total = 0;
          
          data.subcategories.forEach(sub => {
            selectedValues[sub.uuid] = sub.selected_value;
            selectedPoints[sub.uuid] = sub.points;
            total += sub.points;
          });
          
          setSelectedSubcategoryValues(selectedValues);
          setSelectedSubcategoryPoints(selectedPoints);
          setTotalPoints(total);
          
          if (data.category.uuid) {
            const subcats = await userService.getSubcategoriesByParent(data.category.uuid);
            setSubcategoriesData(subcats);
          }
          
        } else if (props.categoryUuid && props.categoryName) {
          setIsCreating(true);
          const data = await userService.getSubcategoriesByParent(props.categoryUuid);
          setSubcategoriesData(data);
          
          setName(props.categoryName);
          
          const initialValues: Record<string, string> = {};
          const initialPoints: Record<string, number> = {};
          let total = 0;
          
          data.forEach(subcat => {
            if (subcat.values && subcat.values.length > 0) {
              const firstValue = subcat.values[0];
              initialValues[subcat.uuid || ''] = firstValue.name;
              initialPoints[subcat.uuid || ''] = firstValue.points;
              total += firstValue.points;
            }
          });
          
          setSelectedSubcategoryValues(initialValues);
          setSelectedSubcategoryPoints(initialPoints);
          setTotalPoints(total);
          
          setAttachmentLinkValid(false);
          setCommentValid(false);
          setAchievementDateValid(false);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [props.achievementUuid, props.categoryUuid, props.categoryName]);

  const handleSubcategoryChange = (subcategoryUuid: string, value: string) => {
    const subcategory = subcategoriesData.find(sub => sub.uuid === subcategoryUuid);
    
    if (!subcategory) return;
    
    const selectedScoreItem = subcategory.values.find(item => item.name === value);
    
    if (!selectedScoreItem) return;
    
    const newValues = {
      ...selectedSubcategoryValues,
      [subcategoryUuid]: value
    };
    setSelectedSubcategoryValues(newValues);
    
    const newPoints = {
      ...selectedSubcategoryPoints,
      [subcategoryUuid]: selectedScoreItem.points
    };
    setSelectedSubcategoryPoints(newPoints);
    
    calculateTotalPoints(newPoints);
  };

  const handleAttachmentLinkChange = (value: string, isValid: boolean) => {
    setAttachmentLink(value);
    setAttachmentLinkValid(isValid);
  };

  const handleDateChange = (value: string, isValid: boolean) => {
    setAchievementDate(value);
    setAchievementDateValid(isValid);
  };

  const handleCommentChange = (value: string, isValid: boolean) => {
    setComment(value);
    setCommentValid(isValid);
  };

  const prepareSaveData = (): CreateAchievement => {
    const subcategoriesArray = Object.entries(selectedSubcategoryValues)
      .filter(([_, value]) => value)
      .map(([uuid, selected_value]) => ({
        uuid,
        selected_value
      }));

    if (isCreating && props.categoryUuid && props.categoryName) {
      return {
        name: name || props.categoryName,
        comment: comment || undefined,
        attachment_link: attachmentLink,
        category_uuid: props.categoryUuid,
        category_name: props.categoryName,
        achievement_date: achievementDate,
        subcategories: subcategoriesArray
      };
    } else if (achievementData) {
      return {
        uuid: achievementData.uuid,
        name: name || achievementData.category.name,
        comment: comment || undefined,
        attachment_link: attachmentLink,
        category_uuid: achievementData.category.uuid || "",
        category_name: achievementData.category.name,
        achievement_date: achievementDate,
        subcategories: subcategoriesArray
      };
    }

    throw new Error("Недостаточно данных для сохранения");
  };

  const handleSave = async () => {
    if (!isFormValid) return;
    
    setLoading(true);
    try {
      const saveData = prepareSaveData();

      if (isCreating) {
        await userService.createAchievement(saveData);
      } else if (saveData.uuid) {
        await userService.updateAchievement(saveData.uuid, saveData);
      }
      
      props.onClose();
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderDynamicSubcategories = () => {
    if (isCreating) {
      return subcategoriesData.map(subcategory => {
        const currentPoints = selectedSubcategoryPoints[subcategory.uuid || ''] || 0;
        
        return (
          <DropdownInput
            key={subcategory.uuid}
            label={`${subcategory.name}`}
            value={selectedSubcategoryValues[subcategory.uuid || ''] || ""}
            options={subcategory.values.map(item => ({
              value: item.name,
              label: `${item.name}`
            }))}
            fullWidth
            placeholder="Выберите значение..."
            onChange={(value) => handleSubcategoryChange(subcategory.uuid || '', String(value))}
          />
        );
      });
    } else if (achievementData && subcategoriesData.length > 0) {
      return achievementData.subcategories.map(subcategory => {
        const currentPoints = selectedSubcategoryPoints[subcategory.uuid] || subcategory.points || 0;
        
        const fullSubcategory = subcategoriesData.find(sub => sub.uuid === subcategory.uuid);
        
        return (
          <DropdownInput
            key={subcategory.uuid}
            label={`${subcategory.name}`}
            value={selectedSubcategoryValues[subcategory.uuid] || subcategory.selected_value}
            options={
              fullSubcategory 
                ? fullSubcategory.values.map(item => ({
                    value: item.name,
                    label: `${item.name}`
                  }))
                : subcategory.available_values.map(value => ({
                    value: value,
                    label: value
                  }))
            }
            fullWidth
            placeholder="Выберите значение..."
            onChange={(value) => handleSubcategoryChange(subcategory.uuid, String(value))}
          />
        );
      });
    }
    
    return null;
  };

  return (
    <Modal
      title={isCreating ? "Создание достижения" : "Редактирование достижения"}
      fullWidth
      loading={loading}
      onClose={props.onClose}
      maxWidth={640}
      buttons={[
        { text: "Закрыть", variant: ButtonVariant.OUTLINE, onClick: props.onClose },
        { 
          text: "Сохранить", 
          variant: ButtonVariant.PRIMARY, 
          onClick: handleSave,
          disabled: !isFormValid || loading
        },
      ]}
    >
      <div className="form">
        <DefaultInput
          label="Категория"
          value={
            isCreating 
              ? props.categoryName || ""
              : achievementData?.category.name || ""
          }
          onChange={() => {}}
          fullWidth
          disabled
        />

        {renderDynamicSubcategories()}

        <DefaultInput
          label="Сумма баллов"
          value={String(totalPoints)}
          onChange={() => {}}
          fullWidth
          disabled
        />

        <DefaultInput
          label="Ссылка на документы"
          value={attachmentLink}
          onChange={handleAttachmentLinkChange}
          placeholder="https://..."
          fullWidth
          required
          error={attachmentLinkError}
        />

        <DefaultInput
          label="Дата достижения"
          value={achievementDate}
          onChange={handleDateChange}
          placeholder="dd.mm.yyyy"
          fullWidth
          mask="date"
          required
          error={achievementDateError}
        />

        {!isCreating && (
          <DefaultInput
            label="Статус"
            value={status}
            onChange={() => {}}
            fullWidth
            disabled
          />
        )}

        <TextareaInput
          label="Комментарий"
          value={comment}
          onChange={handleCommentChange}
          fullWidth
          rows={4}
          required
          placeholder="Введите комментарий"
          error={commentError}
        />
      </div>
    </Modal>
  );
};

export default CreateAchievementForm;
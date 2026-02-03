"use client";

import React, { useEffect, useState } from "react";
import { DefaultInput, TextareaInput } from "@/components/inputs";
import { ButtonVariant } from "@/models/types";
import Modal from "@/components/modal";
import { UpdateAndViewAchievement } from "@/models/Achievement";
import { AchievementService } from "@/services";

export interface ViewAchievementFormProps {
  onClose: () => void;
  achievementUuid: string;
  userUuid?: string;
}

const ViewAchievementForm: React.FC<ViewAchievementFormProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [totalPoints, setTotalPoints] = useState(0);
  
  const [achievementData, setAchievementData] = useState<UpdateAndViewAchievement | null>(null);
  const [status, setStatus] = useState<string>("");
  const [comment, setComment] = useState("");
  const [isActionDisabled, setIsActionDisabled] = useState<boolean>(false);

  const achievmentService = AchievementService.getInstance();

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await achievmentService.getAchievementById(props.achievementUuid);
      setAchievementData(data);
      
      setComment(data.comment || "");
      setStatus(data.status || "");
      
      const total = data.subcategories.reduce((sum, sub) => sum + sub.points, 0);
      setTotalPoints(total);
      
    } catch (error) {
      console.error("Ошибка загрузки данных достижения:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [props.achievementUuid]);

  const handleApprove = async () => {
    if (!props.achievementUuid || isActionDisabled) return;
    
    setActionLoading(true);
    try {
      
      const response = await achievmentService.approveAchievement(props.achievementUuid);;

      if (response && props.userUuid)  achievmentService.getAchievementsByUserUuid(props.userUuid);
      
      props.onClose();
    } catch (error) {
      console.error("Ошибка при одобрении достижения:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!props.achievementUuid || isActionDisabled) return;
    
    setActionLoading(true);
    try {
      const response = await achievmentService.rejecteAchievement(props.achievementUuid);

      if (response && props.userUuid)  achievmentService.getAchievementsByUserUuid(props.userUuid);
      props.onClose();
    } catch (error) {
      console.error("Ошибка при отклонении достижения:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const renderSubcategories = () => {
    if (!achievementData) return null;
    
    return achievementData.subcategories.map(subcategory => (
      <DefaultInput
        key={subcategory.uuid}
        label={`${subcategory.name}`}
        value={subcategory.selected_value}
        onChange={() => {}}
        fullWidth
        disabled
      />
    ));
  };

  return (
    <Modal
      title={`Просмотр достижения`}
      fullWidth
      loading={loading}
      onClose={props.onClose}
      maxWidth={640}
      buttons={[
        { 
          text: "Закрыть", 
          variant: ButtonVariant.OUTLINE, 
          onClick: props.onClose,
          disabled: actionLoading
        },
        { 
          text: "Отклонить", 
          variant: ButtonVariant.OUTLINE, 
          onClick: handleReject,
          disabled: actionLoading || isActionDisabled,
        },
        { 
          text: "Одобрить", 
          variant: ButtonVariant.PRIMARY, 
          onClick: handleApprove,
          disabled: actionLoading || isActionDisabled,
        },
      ]}
    >
      <div className="form">
        <DefaultInput
          label="Категория"
          value={achievementData?.category.name || ""}
          onChange={() => {}}
          fullWidth
          disabled
        />

        {renderSubcategories()}

        <DefaultInput
          label="Статус"
          value={status}
          onChange={() => {}}
          fullWidth
          disabled
        />

        <DefaultInput
          label="Сумма баллов"
          value={String(totalPoints)}
          onChange={() => {}}
          fullWidth
          disabled
        />

        <DefaultInput
          label="Ссылка на документы"
          value={achievementData?.attachment_link || ""}
          onChange={() => {}}
          fullWidth
          disabled
        />

        <DefaultInput
          label="Дата достижения"
          value={achievementData?.achievement_date || ""}
          onChange={() => {}}
          fullWidth
          disabled
        />

        <TextareaInput
          label="Комментарий"
          value={comment}
          onChange={() => {}}
          fullWidth
          rows={4}
          disabled
        />
      </div>
    </Modal>
  );
};

export default ViewAchievementForm;
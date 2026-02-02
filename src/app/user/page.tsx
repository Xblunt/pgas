"use client";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import { SectionTitle, AchievementsBlock, DividerSpace } from "./page.styles";
import { DropdownBlock } from "@/components/blocks";
import DefaultBlock from "@/components/blocks/DefaultBlock/DefaultBlock";
import { CreateAchievementForm } from "./components";
import Loader from "@/components/loader";
import { UserService } from "@/services";
import { transformToDropdownItems } from "@/utils/achievement";

const UserPage: React.FC = () => {
    const { userStore } = useStores();
    const userService = UserService.getInstance();
    const [openUuids, setOpenUuids] = useState<Record<string, boolean>>({});
    const [loadingAchievement, setLoadingAchievement] = useState<string | null>(null);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryUuid, setSelectedCategoryUuid] = useState<string | null>(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
    const [selectedAchievementUuid, setSelectedAchievementUuid] = useState<string | null>(null);

    useEffect(() => {
        userService.getUserPosition();
        userService.getAchievements();
    }, []);

    const toggleHandler = (uuid: string) => {
        setOpenUuids((prev) => ({ ...prev, [uuid]: !prev[uuid] }));
    };

    const handleDelete = async (itemUuid: string, categoryUuid: string) => {
        setLoadingAchievement(categoryUuid);
        await userService.deleteAchievement(itemUuid)
            .finally(() =>  setLoadingAchievement(null));
    };

    const openCreateModal = (categoryUuid: string, categoryName: string) => {
        setSelectedCategoryUuid(categoryUuid);
        setSelectedCategoryName(categoryName);
        setSelectedAchievementUuid(null);
        setIsModalOpen(true);
    };

    const openEditModal = (categoryUuid: string, achievementUuid: string) => {
        const category = userStore.allAchievements.find(item => item.category_uuid === categoryUuid);
        if (category) {
            setSelectedCategoryUuid(categoryUuid);
            setSelectedCategoryName(category.category_name);
            setSelectedAchievementUuid(achievementUuid);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCategoryUuid(null);
        setSelectedCategoryName(null);
        setSelectedAchievementUuid(null);
    };

    if (userStore.isLoading) return <Loader />;

    return (
        <div className="page">
            <DefaultBlock
                title={"Лидер рейтинга:"}
                number={1}
                primaryText={String(userStore.position?.leader_points || "0")}
                secondaryText={"Баллов"}
            />
            <DefaultBlock
                title={"Текущее место в рейтинге:"}
                number={userStore.position?.current_pos || 0}
                primaryText={String(userStore.position?.current_points || "0")}
                secondaryText={"Баллов"}
            />

            <SectionTitle>Ваши достижения</SectionTitle>

            <AchievementsBlock>
                {userStore.allAchievements.map((item, idx) => (
                    <React.Fragment key={item.category_uuid}>
                        <DropdownBlock
                            title={item.category_name}
                            uuid={item.category_uuid}
                            loadingUuid={loadingAchievement}
                            isOpen={!!openUuids[item.category_uuid]}
                            items={transformToDropdownItems(item.achievements)}
                            onToggle={() => toggleHandler(item.category_uuid)}
                            onAdd={() => openCreateModal(item.category_uuid, item.category_name)}
                            onEdit={(achievementUuid) => openEditModal(item.category_uuid, achievementUuid)}
                            onDelete={(uuid) => handleDelete(uuid, item.category_uuid)}
                        />
                        {idx < userStore.allAchievements.length - 1 && <DividerSpace />}
                    </React.Fragment>
                ))}
            </AchievementsBlock>

            {isModalOpen && (
                <CreateAchievementForm
                    onClose={closeModal}
                    categoryName={selectedCategoryName}
                    categoryUuid={selectedCategoryUuid}
                    achievementUuid={selectedAchievementUuid || undefined}
                />
            )}
        </div>
    );
};

export default observer(UserPage);
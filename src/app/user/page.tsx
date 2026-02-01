"use client";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import { SectionTitle, AchievementsBlock, DividerSpace } from "./page.styles";
import { DropdownBlock } from "@/components/blocks";
import DefaultBlock from "@/components/blocks/DefaultBlock/DefaultBlock";
import { CreateAchievementForm } from "./components";
import Loader from "@/components/loader";
import { AchievementService, UserService } from "@/services";
import { transformToDropdownItems } from "@/utils/achievement";


const UserPage: React.FC = () => {
    const { userStore, achievementStore } = useStores();
    const achievmentService = AchievementService.getInstance();
    const userService = UserService.getInstance();
    const [openUuids, setOpenUuids] = useState<Record<string, boolean>>({});
    const [loadingAchievement, setLoadingAchievement] = useState<boolean>(false);

    useEffect(() => {
        userService.getUserPosition();
        userService.getAchievements();
    }, []);

    const toggleHandler = (uuid: string) => {
        setOpenUuids((prev) => ({ ...prev, [uuid]: !prev[uuid] }));
    };

    const handleDelete = async (itemUuid: string) => {
        setLoadingAchievement(true);
        await userService.deleteAchievement(itemUuid)
            .finally(() =>  setLoadingAchievement(false));
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
                            loading={loadingAchievement}
                            isOpen={!!openUuids[item.category_uuid]}
                            items={transformToDropdownItems(item.achievements)}
                            onToggle={() => toggleHandler(item.category_uuid)}
                            // onAdd={() => openCreateModal(item.uuid)}
                            // onEdit={(uuid) => openEditModal(item.uuid, uuid)}
                            onDelete={(uuid) => handleDelete(uuid)}
                        />
                        {idx < item.achievements.length - 1 && <DividerSpace />}
                    </React.Fragment>
                ))}
            </AchievementsBlock>

            {/* {isModalOpen && (
       
            )} */}
        </div>
    );
};

export default observer(UserPage);

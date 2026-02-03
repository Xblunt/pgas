"use client";

import React, { useEffect, useState } from "react";
import Toolbar from "@/components/toolbar/Toolbar";
import { ButtonAction, ButtonVariant } from "@/models/types";
import { DefaultBlock } from "@/components/blocks";
import Filters from "@/components/filters";
import Pagination from "@/components/pagination";
import { ViewAchievementForm, ViewUserModal, WinnerQuantityForm } from "./components";
import { useStores } from "@/hooks/useStores";
import Loader from "@/components/loader";
import { RaitingService } from "@/services";
import { User } from "@/models/User";
import { observer } from "mobx-react-lite";

const AdminRatingPage: React.FC = () => {
    const { raitingStore } = useStores();
    const raitingService = RaitingService.getInstance();

    const [offset, setOffset] = useState<number>(0);
    const [limit, stLimit] = useState<number>(20);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showArchived, setShowArchived] = useState<boolean>(false);
    const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
    
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [viewQuantityModal, setViewQuantityModal] = useState<boolean>(false);
    const [selectedAchievementUuid, setSelectedAchievementUuid] = useState<string | null>(null);

    useEffect(() => {
        getUsers(searchValue, showArchived, onlyVerified, limit, offset);
    }, [searchValue, showArchived, onlyVerified, limit, offset])

    const getUsers = (search?: string, valid?: boolean, winners?: boolean, limit?: number, offset?: number) => {
        raitingService.getAllUsers(search, valid, winners, limit, offset);
    }

    const handleItemClick = (active: boolean, uuid: string) => {        
        const actionPromise = !active 
            ? raitingService.unverifyUser(uuid) 
            : raitingService.verifyUser(uuid);
        
        actionPromise
            .then(() => {
                getUsers(searchValue, showArchived, onlyVerified, limit, offset);
            })
    };

    const handlePageChange = (newOffset: number) => {
        setOffset(newOffset);
    };

    const handleCloseViewUserAchievement = () => {
        setActiveUser(null);
        getUsers(searchValue, showArchived, onlyVerified, limit, offset);
    };

    const handleCloseWinnerQuantityModal = () => {
        setViewQuantityModal(false);
        getUsers(searchValue, showArchived, onlyVerified, limit, offset);
    };

    const toolbarButtons: ButtonAction[] = [
        {
            text: "Задать число победителей",
            variant: ButtonVariant.OUTLINE,
            onClick: () => setViewQuantityModal(true),
        },
        {
            text: "Отчёт",
            variant: ButtonVariant.PRIMARY,
            exportToExcel: true,
            excelData: raitingStore.allUsers?.data || [],
        },
    ];

    const getUsersButtons = (active: boolean, uuid: string) => {
        return active ? [
            {
                text: "Отклонить",
                icon: "cross",
                onClick: () => handleItemClick(false, uuid),
            },
        ] 
        : [
            {
                text: "Одобрить",
                icon: "check",
                onClick: () => handleItemClick(true, uuid),
            },
        ];
    };

    const filterCheckboxes = [
        {
            label: "Только победители",
            checked: onlyVerified,
            onChange: (checked: boolean) => setOnlyVerified(checked),
        },
        {
            label: "Только верифицированные",
            checked: showArchived,
            onChange: (checked: boolean) => setShowArchived(checked),
        }
    ];

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    if (raitingStore.isLoading) return <Loader />

    return (
        <div className="page">
            <Toolbar 
                title="Рейтинг ПГАС"
                buttons={toolbarButtons}
            />

            <Filters
                searchValue={searchValue}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Поиск..."
                checkboxes={filterCheckboxes}
            />

            {raitingStore.allUsers?.data.map((user, idx) => (
                <DefaultBlock 
                    key={user.uuid} 
                    number={((raitingStore.allUsers?.pagination?.offset || 0) + idx + 1)}
                    primaryText={user.name} 
                    actions={getUsersButtons(!!user.valid, user.uuid || "")} 
                    onClick={() => setActiveUser(user)}
                    tags={user.all_achievement_verified ? ["Все достижения проверены"] : undefined}
                />
            ))}

            <Pagination
                totalItems={raitingStore.allUsers?.pagination?.total_records || 0}
                limit={raitingStore.allUsers?.pagination?.limit || 20}
                offset={raitingStore.allUsers?.pagination?.offset || 0}
                onChange={handlePageChange}
                onLimitChange={(limit: number) => stLimit(limit)}
                visiblePages={5}
                showInfo={true}
            />

            {activeUser && <ViewUserModal onClose={handleCloseViewUserAchievement} onSelect={(uuid) => setSelectedAchievementUuid(uuid)} name={activeUser.name} uuid={activeUser.uuid || ""} />}
            {viewQuantityModal && <WinnerQuantityForm onClose={handleCloseWinnerQuantityModal} />}
            {selectedAchievementUuid && activeUser && <ViewAchievementForm  userUuid={activeUser.uuid} achievementUuid={selectedAchievementUuid} onClose={() => setSelectedAchievementUuid(null)}/>}
        </div>
    );
};

export default observer(AdminRatingPage);

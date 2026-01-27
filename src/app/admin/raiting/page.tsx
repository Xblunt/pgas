"use client";

import React, { useEffect, useState } from "react";
import Toolbar from "@/components/toolbar/Toolbar";
import { ButtonAction, ButtonVariant } from "@/models/types";
import { DefaultBlock } from "@/components/blocks";
import Filters from "@/components/filters";
import Pagination from "@/components/pagination";
import { ConfirmResetModal, ViewUserModal } from "./components";

const AdminRaitingPage: React.FC = () => {
    const [allUsers] = useState([
        { uuid: '1', name: 'Иван Иванович Иванов' },
        { uuid: '2', name: 'Петр Петрович Петров' },
        { uuid: '3', name: 'Сергей Сергеевич Сергеев' },
        { uuid: '4', name: 'Алексей Алексеевич Алексеев' },
        { uuid: '5', name: 'Дмитрий Дмитриевич Дмитриев' },
        { uuid: '6', name: 'Андрей Андреевич Андреев' },
        { uuid: '7', name: 'Михаил Михайлович Михайлов' },
        { uuid: '8', name: 'Николай Николаевич Николаев' },
        { uuid: '9', name: 'Владимир Владимирович Владимиров' },
        { uuid: '10', name: 'Александр Александрович Александров' },
        { uuid: '11', name: 'Евгений Евгеньевич Евгеньев' },
        { uuid: '12', name: 'Константин Константинович Константинов' },
    ]);

    const [limit, setLimit] = useState<number>(10);
    const [offset, setOffset] = useState<number>(0);
    
    const [currentUsers, setCurrentUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

    const [searchValue, setSearchValue] = useState<string>('');
    const [showArchived, setShowArchived] = useState<boolean>(false);
    const [onlyActive, setOnlyActive] = useState<boolean>(false);
    const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
    
    const [activeUser, setActiveUser] = useState<any | null>(null);
    const [viewResetModal, setViewResetModal] = useState<boolean>(false);
    const [selectedAchievementUuid, setSelectedAchievementUuid] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedAchievementUuid) return;
    }, [selectedAchievementUuid]);

    useEffect(() => {
        let filtered = [...allUsers];
        
        if (searchValue.trim()) {
            const searchLower = searchValue.toLowerCase();
            filtered = filtered.filter(user => 
                user.name.toLowerCase().includes(searchLower)
            );
        }
        
        
        setFilteredUsers(filtered);
        setOffset(0);
    }, [searchValue, showArchived, onlyActive, onlyVerified, allUsers]);

    useEffect(() => {
        const startIndex = offset;
        const endIndex = offset + limit;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        setCurrentUsers(paginatedUsers);
    }, [filteredUsers, offset, limit]);

    const handleExport = () => {
    };

    const handleResetAll = () => {
        setSearchValue('');
        setShowArchived(false);
        setOnlyActive(false);
        setOnlyVerified(false);
        setOffset(0);
        setViewResetModal(false);
    };

    const handleItemClick = () => {
    };

    const handlePageChange = (newOffset: number) => {
        setOffset(newOffset);
    };

    const toolbarButtons: ButtonAction[] = [
        {
            text: "Сбросить всё",
            variant: ButtonVariant.OUTLINE,
            onClick: () => setViewResetModal(true),
        },
        {
            text: "Отчёт",
            variant: ButtonVariant.PRIMARY,
            onClick: handleExport,
        },
    ];

    const getUsersButtons = (active: boolean) => {
        return active ? [
            {
                text: "Отклонить",
                icon: "cross",
                onClick: handleItemClick,
            },
        ] 
        : [
            {
                text: "Одобрить",
                icon: "check",
                onClick: handleItemClick,
            },
        ];
    };

    const filterCheckboxes = [
        {
            label: "Только победители",
            checked: showArchived,
            onChange: (checked: boolean) => setShowArchived(checked),
        },
        {
            label: "Только верифицированные",
            checked: onlyVerified,
            onChange: (checked: boolean) => setOnlyVerified(checked),
        }
    ];

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

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

            {currentUsers.map((user, idx) => (
                <DefaultBlock 
                    key={user.uuid} 
                    number={offset + idx + 1} 
                    primaryText={user.name} 
                    actions={getUsersButtons(false)} 
                    onClick={() => setActiveUser(user)}
                />
            ))}

            <Pagination
                totalItems={filteredUsers.length}
                limit={limit}
                offset={offset}
                onChange={handlePageChange}
                visiblePages={5}
                showInfo={true}
            />

            {activeUser && <ViewUserModal onClose={() => setActiveUser(null)} onSelect={(uuid) => setSelectedAchievementUuid(uuid)} user={activeUser} />}
            {viewResetModal && <ConfirmResetModal onClose={() => setViewResetModal(false)} onConfirm={handleResetAll} />}
                
        </div>
    );
};

export default AdminRaitingPage;
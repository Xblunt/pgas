"use client";

import React, { useEffect, useState } from "react";
import Toolbar from "@/components/toolbar/Toolbar";
import { ButtonAction, ButtonVariant } from "@/models/types";
import { DefaultBlock } from "@/components/blocks";
import ViewUserModal from "./ViewUserModal";


const AdminRaitingPage: React.FC = () => {
    const [users, setUsers] = useState([
        {
            uuid:'11',
            name: 'Иван Иван Иванович'
        },
        {
            uuid:'12',
            name: 'Иван Иван Иванович'
        },
        {
            uuid:'11',
            name: 'Иван Иван Иванович'
        },
    ]);

    const [activeUser, setActiveUser] = useState<any | null>(null);
    const [selectedAchievementUuid, setSelectedAchievementUuid] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedAchievementUuid) return;

    }, [selectedAchievementUuid])

    const handleExport = () => {
    };

    const handleReset = () => {
    };

    
    const handleItemClick = () => {
    };

    const toolbarButtons = [
        {
            text: "Сбросить всё",
            variant: ButtonVariant.OUTLINE,
            onClick: handleReset,
        },
        {
            text: "Отчёт",
            variant: ButtonVariant.PRIMARY,
            onClick: handleExport,
        },
    ]

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
        ]
    } 

    return (
        <div className="page">
            <Toolbar 
                buttons={toolbarButtons}
            />

            {users.map((user, idx) => (
                <DefaultBlock number={idx + 1} primaryText={user.name} actions={getUsersButtons(true)} onClick={() => setActiveUser(user)}/>
            ))}

            {activeUser && <ViewUserModal onClose={() => setActiveUser(null)} onSelect={(uuid) => setSelectedAchievementUuid(uuid)} user={activeUser} />}
        </div>
    );
};

export default AdminRaitingPage;

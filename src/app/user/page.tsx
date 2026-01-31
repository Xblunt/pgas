"use client";

import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import { SectionTitle, AchievementsBlock, DividerSpace } from "./page.styles";
import { DropdownBlock } from "@/components/blocks";
import DefaultBlock from "@/components/blocks/DefaultBlock/DefaultBlock";
import { AchievementFormState, DropdownBlockItem } from "@/models/types";
import { CreateAchievementForm } from "./components";
import Loader from "@/components/loader";
import { useToast } from "@/app/ToastProvider";

type AchievementGroup = {
    uuid: string;
    title: string;
    subtitle: string;
    items: DropdownBlockItem[];
};

export const initialGroups: AchievementGroup[] = [
    {
        uuid: "g1",
        title: "Статья",
        subtitle: "Публикации",
        items: [],
    },
    {
        uuid: "g2",
        title: "Конференция",
        subtitle: "Участия и призовые места",
        items: [],
    },
    {
        uuid: "g3",
        title: "Общественная деятельность",
        subtitle: "Волонтёрство и мероприятия",
        items: [],
    },
];

const mockFio = "Иванов Иван Иванович";

const calcPreliminaryPoints = (subcategory: string, place: string, participants: number) => {
    const baseMap: Record<string, number> = {
        vak: 10,
        scopus: 12,
        wos: 14,
    };

    const placeBonusMap: Record<string, number> = {
        none: 0,
        "1": 3,
        "2": 2,
        "3": 1,
    };

    const base = baseMap[subcategory] ?? 0;
    const placeBonus = placeBonusMap[place] ?? 0;
    const participantsPenalty = Math.max(0, (participants || 1) - 1);

    const raw = base + placeBonus - participantsPenalty;
    return Math.max(0, raw);
};

const calcActualPoints = (preliminary: number) => {
    return Math.max(0, Math.round(preliminary * 0.4));
};

const createEmptyForm = (category: string): AchievementFormState => ({
    category,
    subcategory: "",
    place: "",
    participants: 1,
    preliminaryPoints: 0,
    actualPoints: 0,
    status: "pending",
    publicationDate: "",
    file: null,
    fileName: "",
    link: "",
    description: "",
});

const mapSubcategoryValueToExpectedName = (v: string) => {
    if (v === "vak") return "ВАК";
    if (v === "scopus") return "Scopus";
    if (v === "wos") return "Web of Science";
    return "";
};

const UserPage: React.FC = () => {
    const { userStore, achievementStore } = useStores();
    const { showToast } = useToast();

    const [openGroupIds, setOpenGroupIds] = useState<Record<string, boolean>>({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [activeGroupId, setActiveGroupId] = useState<string>("");
    const [editingItemId, setEditingItemId] = useState<string>("");
    const [form, setForm] = useState<AchievementFormState>(createEmptyForm(""));
    const [autoCalc, setAutoCalc] = useState<boolean>(true);

    useEffect(() => {
        if (!autoCalc) return;

        const preliminary = calcPreliminaryPoints(form.subcategory, form.place, form.participants);
        const actual = calcActualPoints(preliminary);

        setForm((prev) => ({
            ...prev,
            preliminaryPoints: preliminary,
            actualPoints: actual,
        }));
    }, [autoCalc, form.subcategory, form.place, form.participants]);

    useEffect(() => {
        achievementStore.loadUserPageData().catch(() => {});
    }, [achievementStore]);

    const achievements = achievementStore.achievements;
    const parents = achievementStore.parentCategories;

    const achievementMap = useMemo(() => {
        const m: Record<string, any> = {};
        for (const a of achievements) m[a.uuid] = a;
        return m;
    }, [achievements]);

    const groups: AchievementGroup[] = useMemo(() => {
        const list: AchievementGroup[] = (parents || []).map((p) => ({
            uuid: p.uuid,
            title: p.name,
            subtitle: p.comment || "",
            items: [],
        }));

        const byName: Record<string, AchievementGroup> = {};
        for (const g of list) byName[g.title] = g;

        for (const a of achievements || []) {
            const groupName = a.category_name || "Другое";
            if (!byName[groupName]) {
                byName[groupName] = {
                    uuid: `unknown:${groupName}`,
                    title: groupName,
                    subtitle: "",
                    items: [],
                };
                list.push(byName[groupName]);
            }

            byName[groupName].items.push({
                uuid: a.uuid,
                title: mockFio,
                subtitle: a.comment || "",
                points: Number(a.point_amount || 0),
                tags: [a.status || ""].filter(Boolean),
            });
        }

        return list;
    }, [parents, achievements]);

    useEffect(() => {
        setOpenGroupIds((prev) => {
            const next: Record<string, boolean> = { ...prev };
            for (const g of groups) {
                if (next[g.uuid] === undefined) {
                    next[g.uuid] = (g.items?.length || 0) > 0;
                }
            }
            return next;
        });
    }, [groups]);

    const toggleGroup = (groupUuid: string) => {
        setOpenGroupIds((prev) => ({ ...prev, [groupUuid]: !prev[groupUuid] }));
    };

    const openCreateModal = async (groupUuid: string) => {
        const group = groups.find((g) => g.uuid === groupUuid);
        if (!group) return;

        await achievementStore.ensureChildCategoriesLoaded(groupUuid);

        setModalMode("create");
        setAutoCalc(true);
        setActiveGroupId(groupUuid);
        setEditingItemId("");
        setForm(createEmptyForm(group.title));
        setIsModalOpen(true);
    };

    const openEditModal = async (groupUuid: string, itemUuid: string) => {
        const group = groups.find((g) => g.uuid === groupUuid);
        if (!group) return;

        await achievementStore.ensureChildCategoriesLoaded(groupUuid);

        const a = achievementMap[itemUuid];

        setModalMode("edit");
        setAutoCalc(false);
        setActiveGroupId(groupUuid);
        setEditingItemId(itemUuid);

        setForm({
            ...createEmptyForm(group.title),
            description: a?.comment || "",
            link: a?.attachment_link || "",
            preliminaryPoints: Number(a?.point_amount || 0),
            actualPoints: calcActualPoints(Number(a?.point_amount || 0)),
            status: "pending",
        });

        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleFormChange = (patch: Partial<AchievementFormState>) => {
        if (modalMode === "edit") {
            if (patch.subcategory !== undefined || patch.place !== undefined || patch.participants !== undefined) {
                setAutoCalc(true);
            }
        }
        setForm((prev) => ({ ...prev, ...patch }));
    };

    const buildCategoryUuidsForRequest = () => {
        const parentUuid = activeGroupId;
        const uuids: string[] = [];

        if (parentUuid) uuids.push(parentUuid);

        const expectedChildName = mapSubcategoryValueToExpectedName(form.subcategory);
        const childs = achievementStore.childCategoriesByParent[parentUuid] || [];

        if (expectedChildName) {
            const found = childs.find((c) => (c.name || "").trim() === expectedChildName);
            if (found?.uuid) uuids.push(found.uuid);
        }

        return uuids;
    };

    const saveAchievement = async () => {
        if (!activeGroupId) return;

        const category_uuids = buildCategoryUuidsForRequest();

        const payload = {
            uuid: modalMode === "edit" ? editingItemId : undefined,
            attachment_link: (form.link || "").trim(),
            comment: (form.description || "").trim(),
            category_uuids,
        };

        if (!payload.attachment_link) return;

        if (modalMode === "create") {
            await achievementStore.createAchievement(payload);
            showToast("Сохранено", "success");
        } else {
            await achievementStore.updateAchievement(payload);
            showToast("Сохранено", "success");
        }

        setIsModalOpen(false);
    };

    const handleDelete = async (groupUuid: string, itemUuid: string) => {
        await achievementStore.deleteAchievement(itemUuid);
        showToast("Удалено", "success");
    };

    const modalTitle = modalMode === "create" ? "Добавить достижение" : "Редактировать достижение";

    const leaderRank = 1;
    const currentRank = 10;
    const leaderPrimary = "Петров Петр Петрович";
    const leaderSecondary = "Факультет ИТ, группа ИВТ-21";
    const currentPrimary = mockFio;
    const currentSecondary = "Факультет ИТ, группа ИВТ-21";

    if (userStore.isLoading || achievementStore.isLoading) return <Loader />;

    return (
        <div className="page">
            <DefaultBlock
                title={"Лидер рейтинга:"}
                number={leaderRank}
                primaryText={leaderPrimary}
                secondaryText={leaderSecondary}
            />
            <DefaultBlock
                title={"Текущее место в рейтинге:"}
                number={currentRank}
                primaryText={currentPrimary}
                secondaryText={currentSecondary}
            />

            <SectionTitle>Ваши достижения</SectionTitle>

            <AchievementsBlock>
                {groups.map((group, idx) => (
                    <React.Fragment key={group.uuid}>
                        <DropdownBlock
                            title={group.title}
                            subtitle={group.subtitle}
                            isOpen={!!openGroupIds[group.uuid]}
                            items={group.items}
                            onToggle={() => toggleGroup(group.uuid)}
                            onAdd={() => openCreateModal(group.uuid)}
                            onEdit={(uuid) => openEditModal(group.uuid, uuid)}
                            onDelete={(uuid) => handleDelete(group.uuid, uuid)}
                        />
                        {idx < groups.length - 1 && <DividerSpace />}
                    </React.Fragment>
                ))}
            </AchievementsBlock>

            {isModalOpen && (
                <CreateAchievementForm
                    value={form}
                    onChange={handleFormChange}
                    categoryDisabled
                    preliminaryDisabled
                    actualDisabled
                    onSave={saveAchievement}
                    onClose={closeModal}
                    title={modalTitle}
                    loading={achievementStore.isMutating}
                />
            )}
        </div>
    );
};

export default observer(UserPage);

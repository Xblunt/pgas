"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useStores } from "@/hooks/useStores";
import Modal from "@/components/modal";
import {
    UserPageContainer,
    SectionTitle,
    InfoCard,
    RankBox,
    InfoText,
    InfoPrimary,
    InfoSecondary,
    AchievementsBlock,
    DividerSpace,
} from "./page.styles";
import { DropdownBlock } from "@/components/blocks";
import type { DropdownBlockItem } from "@/components/blocks";
import CreateAchievementForm, { AchievementFormState } from "./CreateAchievementForm";

type AchievementGroup = {
    id: string;
    title: string;
    subtitle: string;
    items: DropdownBlockItem[];
};

const mockFio = "Иванов Иван Иванович";

const randomTexts = [
    "Участие в научной конференции кафедры",
    "Победа в олимпиаде по дисциплине",
    "Организация мероприятия факультета",
    "Публикация статьи в сборнике",
    "Волонтерская деятельность в университете",
];

const pickRandomText = () => randomTexts[Math.floor(Math.random() * randomTexts.length)];

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

const initialGroups: AchievementGroup[] = [
    {
        id: "g1",
        title: "Статья",
        subtitle: "Публикации",
        items: [
            { id: "a1", title: mockFio, subtitle: pickRandomText(), points: 7, tags: ["ВАК", "Без места"] },
            { id: "a2", title: mockFio, subtitle: pickRandomText(), points: 5, tags: ["ВАК", "2 место"] },
            { id: "a3", title: mockFio, subtitle: pickRandomText(), points: 6, tags: ["Scopus", "Без места"] },
        ],
    },
    {
        id: "g2",
        title: "Конференция",
        subtitle: "Участия и призовые места",
        items: [],
    },
    {
        id: "g3",
        title: "Общественная деятельность",
        subtitle: "Волонтерство и мероприятия",
        items: [],
    },
];

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

const UserPage: React.FC = () => {
    const router = useRouter();
    const { authStore } = useStores();

    const [groups, setGroups] = useState<AchievementGroup[]>(initialGroups);
    const [openGroupIds, setOpenGroupIds] = useState<Record<string, boolean>>({
        g1: true,
        g2: false,
        g3: false,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [activeGroupId, setActiveGroupId] = useState<string>("");
    const [editingItemId, setEditingItemId] = useState<string>("");
    const [form, setForm] = useState<AchievementFormState>(createEmptyForm(""));

    useEffect(() => {
        if (!authStore.token) router.push("/auth");
    }, [authStore.token, router]);

    useEffect(() => {
        const preliminary = calcPreliminaryPoints(form.subcategory, form.place, form.participants);
        const actual = calcActualPoints(preliminary);

        setForm((prev) => ({
            ...prev,
            preliminaryPoints: preliminary,
            actualPoints: actual,
        }));
    }, [form.subcategory, form.place, form.participants]);

    const leaderRank = 1;
    const currentRank = 10;

    const leaderPrimary = "Петров Петр Петрович";
    const leaderSecondary = "Факультет ИТ, группа ИВТ-21";

    const currentPrimary = mockFio;
    const currentSecondary = "Факультет ИТ, группа ИВТ-21";

    const toggleGroup = (groupId: string) => {
        setOpenGroupIds((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
    };

    const openCreateModal = (groupId: string) => {
        const group = groups.find((g) => g.id === groupId);
        if (!group) return;

        setModalMode("create");
        setActiveGroupId(groupId);
        setEditingItemId("");
        setForm(createEmptyForm(group.title));
        setIsModalOpen(true);
    };

    const openEditModal = (groupId: string, itemId: string) => {
        const group = groups.find((g) => g.id === groupId);
        if (!group) return;

        const item = group.items.find((x) => x.id === itemId);
        if (!item) return;

        setModalMode("edit");
        setActiveGroupId(groupId);
        setEditingItemId(itemId);

        setForm({
            ...createEmptyForm(group.title),
            description: item.subtitle,
            preliminaryPoints: item.points,
            actualPoints: calcActualPoints(item.points),
            subcategory: "",
            place: "",
            participants: 1,
            status: "pending",
        });

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFormChange = (patch: Partial<AchievementFormState>) => {
        setForm((prev) => ({ ...prev, ...patch }));
    };

    const tagsFromForm = () => {
        const subLabel =
            form.subcategory === "vak"
                ? "ВАК"
                : form.subcategory === "scopus"
                    ? "Scopus"
                    : form.subcategory === "wos"
                        ? "Web of Science"
                        : "Подкатегория";

        const placeLabel =
            form.place === "1"
                ? "1 место"
                : form.place === "2"
                    ? "2 место"
                    : form.place === "3"
                        ? "3 место"
                        : "Без места";

        return [subLabel, placeLabel];
    };

    const saveAchievement = () => {
        const group = groups.find((g) => g.id === activeGroupId);
        if (!group) return;

        const subtitle = form.description.trim() ? form.description.trim() : pickRandomText();
        const points = form.preliminaryPoints;

        if (modalMode === "create") {
            const newItem: DropdownBlockItem = {
                id: `a${Date.now()}`,
                title: mockFio,
                subtitle,
                points: Math.max(0, points),
                tags: tagsFromForm(),
            };

            setGroups((prev) =>
                prev.map((g) => (g.id === activeGroupId ? { ...g, items: [...g.items, newItem] } : g))
            );
            setOpenGroupIds((prev) => ({ ...prev, [activeGroupId]: true }));
            setIsModalOpen(false);
            return;
        }

        if (modalMode === "edit" && editingItemId) {
            setGroups((prev) =>
                prev.map((g) => {
                    if (g.id !== activeGroupId) return g;
                    return {
                        ...g,
                        items: g.items.map((it) =>
                            it.id === editingItemId
                                ? { ...it, subtitle, points: Math.max(0, points), tags: tagsFromForm() }
                                : it
                        ),
                    };
                })
            );
            setIsModalOpen(false);
        }
    };

    const handleDelete = (groupId: string, itemId: string) => {
        setGroups((prev) =>
            prev.map((g) => (g.id === groupId ? { ...g, items: g.items.filter((x) => x.id !== itemId) } : g))
        );
    };

    const orderedGroups = useMemo(() => groups, [groups]);

    const modalTitle = modalMode === "create" ? "Добавить публикацию" : "Редактировать публикацию";

    return (
        <UserPageContainer>
            <SectionTitle>Лидер рейтинга:</SectionTitle>
            <InfoCard>
                <RankBox>{leaderRank}</RankBox>
                <InfoText>
                    <InfoPrimary>{leaderPrimary}</InfoPrimary>
                    <InfoSecondary>{leaderSecondary}</InfoSecondary>
                </InfoText>
            </InfoCard>

            <SectionTitle>Текущее место в рейтинге:</SectionTitle>
            <InfoCard>
                <RankBox>{currentRank}</RankBox>
                <InfoText>
                    <InfoPrimary>{currentPrimary}</InfoPrimary>
                    <InfoSecondary>{currentSecondary}</InfoSecondary>
                </InfoText>
            </InfoCard>

            <SectionTitle>Ваши достижения</SectionTitle>

            <AchievementsBlock>
                {orderedGroups.map((group, idx) => (
                    <React.Fragment key={group.id}>
                        <DropdownBlock
                            title={group.title}
                            subtitle={group.subtitle}
                            isOpen={!!openGroupIds[group.id]}
                            items={group.items}
                            onToggle={() => toggleGroup(group.id)}
                            onAdd={() => openCreateModal(group.id)}
                            onEdit={(id) => openEditModal(group.id, id)}
                            onDelete={(id) => handleDelete(group.id, id)}
                        />
                        {idx < orderedGroups.length - 1 && <DividerSpace />}
                    </React.Fragment>
                ))}
            </AchievementsBlock>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalTitle}
                showCloseButton
                fullWidth
                maxWidth={640}
                buttons={[
                    { text: "Закрыть", variant: "outline", onClick: closeModal },
                    { text: "Сохранить", variant: "primary", onClick: saveAchievement },
                ]}
            >
                <CreateAchievementForm
                    value={form}
                    onChange={handleFormChange}
                    categoryDisabled
                    preliminaryDisabled
                    actualDisabled
                />
            </Modal>
        </UserPageContainer>
    );
};

export default UserPage;

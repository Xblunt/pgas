import { AchievementsBlock, DividerSpace } from "@/app/user/page.styles";
import { DropdownBlock } from "@/components/blocks";
import Modal from "@/components/modal";
import { ButtonVariant, DropdownBlockItem } from "@/models/types";
import React from "react";
import { useEffect, useState } from "react";
import { Quantity } from "./ViewUserModal.styles";
import { AchievementService } from "@/services";
import { SimpleAchievement, UserAchievement } from "@/models/Achievement";
import { transformToDropdownItems } from "@/utils/achievement";

export type Props = {
    uuid: string;
    name: string;
    onClose: () => void;
    onSelect: (achievementUuid: string) => void
};

const ViewUserModal: React.FC<Props> = (props) => {
    const achievemntService = AchievementService.getInstance();
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<UserAchievement[]>([])
    const [openUuids, setOpenUuids] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setLoading(true);
        achievemntService.getAchievementsByUserUuid(props.uuid)
            .then((response) => setData(response))
            .finally(() => setLoading(false));
    }, [props.uuid]);

    const calculateTotalPoints = () => {
        let total = 0;
        data.forEach(item => {
            item.achievements.forEach((item: SimpleAchievement) => {
                total += item.point_amount || 0;
            });
        });
        return total;
    };

    const totalPoints = calculateTotalPoints();
    
    const toggleHandler = (uuid: string) => {
        setOpenUuids((prev) => ({ ...prev, [uuid]: !prev[uuid] }));
    };
    
    return (
        <Modal
            title={`Достижения студента ${props.name}`}
            fullWidth
            loading={loading}
            maxWidth={640}
            buttons={[
                { text: "Закрыть", variant: ButtonVariant.OUTLINE, onClick: props.onClose  },
            ]}
        >
            <AchievementsBlock>
                {data.map((item, idx) => (
                    <React.Fragment key={item.category_uuid}>
                        <DropdownBlock
                            title={item.category_name}
                            uuid={item.category_uuid}
                            isOpen={!!openUuids[item.category_uuid]}
                            items={transformToDropdownItems(item.achievements)}
                            onToggle={() => toggleHandler(item.category_uuid)}
                            onView={(uuid) => props.onSelect(uuid)}
                            readonly
                        />
                        {idx < data.length - 1 && <DividerSpace />}
                    </React.Fragment>
                ))}
            </AchievementsBlock>

            <Quantity>Итоговая сумма фактических баллов: {totalPoints}</Quantity>

        </Modal>
    );
};

export default ViewUserModal;
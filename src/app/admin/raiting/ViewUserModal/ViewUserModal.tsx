import { initialGroups } from "@/app/user/page";
import { AchievementsBlock, DividerSpace } from "@/app/user/page.styles";
import { DropdownBlock } from "@/components/blocks";
import Modal from "@/components/modal";
import { ButtonVariant } from "@/models/types";
import React from "react";
import { useEffect, useState } from "react";
import { Quantity } from "./ViewUserModal.styles";
import Score from "@/components/score";

export type Props = {
    user: any;
    onClose: () => void;
    onSelect: (achievementUuid: string) => void
};

const ViewUserModal: React.FC<Props> = (props) => {
    const [data, setData] = useState(initialGroups)
    const [openUuids, setOpenUuids] = useState<Record<string, boolean>>({
        g1: true,
        g2: false,
        g3: false,
    });

    useEffect(() => {
    }, [props.user.uuid]);

    const calculateTotalPoints = () => {
        let total = 0;
        data.forEach(group => {
            group.items.forEach(item => {
                total += item.points || 0;
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
            title={`Достижения студента ${props.user.name}`}
            fullWidth
            maxWidth={640}
            buttons={[
                { text: "Закрыть", variant: ButtonVariant.OUTLINE, onClick: props.onClose  },
            ]}
        >
            <AchievementsBlock>
                {data.map((item, idx) => (
                    <React.Fragment key={item.uuid}>
                        <DropdownBlock
                            title={item.title}
                            subtitle={item.subtitle}
                            isOpen={!!openUuids[item.uuid]}
                            items={item.items}
                            onToggle={() => toggleHandler(item.uuid)}
                            onView={() => props.onSelect(item.uuid)}
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
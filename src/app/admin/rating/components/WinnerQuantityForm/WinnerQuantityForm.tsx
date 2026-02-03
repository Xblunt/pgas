import { NumberInput } from "@/components/inputs";
import Modal from "@/components/modal";
import { ButtonVariant } from "@/models/types";
import { RaitingService } from "@/services";
import React, { useEffect, useState } from "react";

export type Props = {
    onClose: () => void;
};

const WinnerQuantityForm: React.FC<Props> = (props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(0)
    const raitingService = RaitingService.getInstance();

    useEffect(() => {
        setLoading(true);
        raitingService.getWinnerQuantity()
            .then((value: number) => setQuantity(value))
            .finally(() => setLoading(false));
    }, [])

    const handleConfirm = () => {
        setLoading(true);
        raitingService.updateWinnerQuantity(quantity)
            .then(() => props.onClose())
            .finally(() => setLoading(false));
    }

    return (
        <Modal
            title={"Задать количество победителей"}
            fullWidth
            loading={loading}
            maxWidth={480}
            onClose={props.onClose}
            buttons={[
                { 
                    text: "Отмена", 
                    variant: ButtonVariant.OUTLINE, 
                    onClick: props.onClose  
                },
                { 
                    text: "Сохранить", 
                    variant: ButtonVariant.PRIMARY, 
                    onClick: handleConfirm  
                },
            ]}
        >
            <div className="form">
                <NumberInput
                    label="Количество победителей"
                    value={quantity}
                    onChange={(value) => setQuantity(value)}
                    fullWidth
                />
            </div>
        </Modal>
    );
};

export default WinnerQuantityForm;


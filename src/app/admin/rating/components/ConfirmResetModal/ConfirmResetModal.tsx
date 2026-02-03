import Modal from "@/components/modal";
import { ButtonVariant } from "@/models/types";
import React from "react";
import { MessageText, ModalContent, WarningText } from "./ConfirmResetModal.styles";

export type Props = {
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
};

const ConfirmationModal: React.FC<Props> = (props) => {
    const handleConfirm = () => {
        props.onConfirm();
    };

    return (
        <Modal
            title={props.title || "Подтверждение действия"}
            fullWidth
            maxWidth={480}
            onClose={props.onClose}
            buttons={[
                { 
                    text: "Отмена", 
                    variant: ButtonVariant.OUTLINE, 
                    onClick: props.onClose  
                },
                { 
                    text: "Да, сбросить", 
                    variant: ButtonVariant.PRIMARY, 
                    onClick: handleConfirm  
                },
            ]}
        >
            <ModalContent>
                <MessageText>
                    {props.message || "Вы действительно желаете сбросить все данные?"}
                </MessageText>
                <WarningText>
                    Это действие нельзя отменить. Все сохранённые данные будут удалены без возможности восстановления. Одобрение приведет к сбросу верификации студентов, а также очищении их достижений.
                </WarningText>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmationModal;


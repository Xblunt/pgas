import React from "react";
import * as XLSX from "xlsx";
import { StyledButton } from "./DefaultButton.styles";
import { ButtonSize, ButtonType, ButtonVariant } from "@/models/types";
import { User } from "@/models/User";

export interface DefaultButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: ButtonType;
  excelData?: User[];
  excelFileName?: string;
  exportToExcel?: boolean;
  onExportStart?: () => void;
  onExportComplete?: (fileName: string) => void;
  onExportError?: (error: string) => void;
}

const DefaultButton: React.FC<DefaultButtonProps> = (props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.exportToExcel && props.excelData) {
      handleExportToExcel();
    }
    
    if (props.disabled || !props.onClick) return;
    props.onClick(e);
  };

  const handleExportToExcel = () => {
    if (!props.excelData || props.excelData.length === 0) {
      props.onExportError?.("Нет данных для экспорта");
      return;
    }

    try {
      props.onExportStart?.();

      const dataToExport = props.excelData.map(user => ({
        "Имя": user.name,
        "Фамилия": user.second_name,
        "Отчество": user.patronymic,
        "№ зачетной книжки": user.gradebook_number,
        "Дата рождения": formatDate(user.birth_date),
        "Email": user.email,
        "Телефон": user.phone_number,
        "Верицирован": user.valid ? "Да" : "Нет"
      }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Пользователи");

      const wscols = [
        { wch: 15 }, // Имя
        { wch: 20 }, // Фамилия
        { wch: 20 }, // Отчество
        { wch: 20 }, // № зачетной книжки
        { wch: 15 }, // Дата рождения
        { wch: 25 }, // Email
        { wch: 15 }, // Телефон
        { wch: 12 }  // Верицирован
      ];
      ws['!cols'] = wscols;

      const fileName = `${props.excelFileName || 'Отчёт'}_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      XLSX.writeFile(wb, fileName);
      
      props.onExportComplete?.(fileName);
    } catch (error) {
      console.error("Ошибка при экспорте в Excel:", error);
      props.onExportError?.("Ошибка при экспорте в Excel");
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    } catch {
      return dateString;
    }
  };

  return (
    <StyledButton
      $variant={props.variant || ButtonVariant.PRIMARY}
      $size={props.size || ButtonSize.MEDIUM}
      $fullWidth={!!props.fullWidth}
      className={props.className}
      onClick={handleClick}
      disabled={props.disabled}
      type={props.type || ButtonType.BUTTON}
    >
      {props.children}
    </StyledButton>
  );
};

export default DefaultButton;
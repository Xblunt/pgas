import React from "react";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
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
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.exportToExcel && props.excelData) {
      await handleExportToExcel();
      return;
    }

    if (props.exportToExcel) {
      handleExportToExcel();
    }
    
    if (props.disabled || !props.onClick) return;
    props.onClick(e);
  };

  const handleExportToExcel = async () => {
    if (!props.excelData || props.excelData.length === 0) {
      props.onExportError?.("Нет данных для экспорта");
      return;
    }

    try {
      props.onExportStart?.();

      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Приложение";
      workbook.created = new Date();

      const worksheet = workbook.addWorksheet("Пользователи");

      worksheet.columns = [
        { header: "Имя", key: "name", width: 15 },
        { header: "Фамилия", key: "second_name", width: 20 },
        { header: "Отчество", key: "patronymic", width: 20 },
        { header: "№ зачетной книжки", key: "gradebook_number", width: 20 },
        { header: "Дата рождения", key: "birth_date", width: 15 },
        { header: "Email", key: "email", width: 25 },
        { header: "Телефон", key: "phone_number", width: 15 },
        { header: "Верифицирован", key: "valid", width: 12 }
      ];

      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true };
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };

      props.excelData.forEach(user => {
        worksheet.addRow({
          name: user.name,
          second_name: user.second_name,
          patronymic: user.patronymic,
          gradebook_number: user.gradebook_number,
          birth_date: formatDate(user.birth_date),
          email: user.email,
          phone_number: user.phone_number,
          valid: user.valid ? "Да" : "Нет"
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const fileName = `${props.excelFileName || 'Отчёт'}_${new Date().toISOString().split('T')[0]}.xlsx`;
      const blob = new Blob([buffer], { 
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
      });

      saveAs(blob, fileName);
      
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
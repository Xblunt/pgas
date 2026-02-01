import React, { useEffect, useState } from "react";
import { Toast, ToastContent, ToastIcon, ToastMessage, ToastClose } from "./ToastItem.styles";

export interface ToastItemProps {
  id: string;
  message: string;
  type: 'success' | 'error';
  duration?: number;
  onClose: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ id, message, type, duration = 5000, onClose }) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 300);
  };

  const iconSvg = type === 'error' 
    ? `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`
    : `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`;

  return (
    <Toast $type={type} className={isExiting ? 'exiting' : ''}>
      <ToastContent>
        <ToastIcon $type={type} dangerouslySetInnerHTML={{ __html: iconSvg }} />
        <ToastMessage>{message}</ToastMessage>
      </ToastContent>
      <ToastClose onClick={handleClose} dangerouslySetInnerHTML={{ __html: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `}} />
    </Toast>
  );
};

export default ToastItem;
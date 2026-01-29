import React from 'react';
import { ToastContainer } from './Toast.styles';
import { ToastItem } from './ToastItem';
import { ToastData } from '@/models/types';

export interface ToastProps {
  toasts: ToastData[];
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, onClose }) => {
  return (
    <ToastContainer>
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          {...toast}
          onClose={onClose}
        />
      ))}
    </ToastContainer>
  );
};

export default Toast;
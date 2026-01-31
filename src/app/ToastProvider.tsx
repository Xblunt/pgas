import Toast from "@/components/toast";
import { ToastData } from "@/models/types";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { setToastFunction } from "@/services/axios/ApiClient";

interface ToastContextType {
  showToast: (message: string, type: "success" | "error", duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error", duration?: number) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  useEffect(() => {
    setToastFunction((message, type) => showToast(message, type));
  }, [showToast]);

  const handleClose = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
      <ToastContext.Provider value={{ showToast }}>
        {children}
        <Toast toasts={toasts} onClose={handleClose} />
      </ToastContext.Provider>
  );
};

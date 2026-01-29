"use client";

import { ReactNode } from "react";
import "./globals.css";
import StoreProvider from "@/stores/StoreProvider";
import Header from "@/components/header";
import { ToastProvider } from "./ToastProvider";

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ru" translate="no">
      <head>
        <title>Система подсчета рейтинга ПГАС</title>
      </head>
      <body>
        <StoreProvider>
          <ToastProvider>
            <Header />
            {children}
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

"use client";

import { ReactNode } from "react";
import "./globals.css";
import StoreProvider from "@/stores/StoreProvider";
import Header from "@/components/header";

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ru" translate="no">
      <head>
        <title>ПГАС</title>
      </head>
      <body>
            <StoreProvider>
              <Header />
              {children}
            </StoreProvider>
      </body>
    </html>
  );
}

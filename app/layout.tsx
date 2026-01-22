import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";
import StoreProvider from "@/stores/StoreProvider";

export const metadata: Metadata = {
  title: "Your App",
  description: "Your application description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <main style={{ paddingTop: '90px' }}>
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
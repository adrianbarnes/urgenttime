import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/toasterProvider";
import SessionWrapper from "./components/sessionwrapper";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UrgentTime",
  description: "urgentTime application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    
    <html lang="en">
      <body className={outfit.className}>
      <SessionWrapper session={session}>
        <ToastProvider >
            {children}
          </ToastProvider>

      </SessionWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/app/components/toasterProvider";
import SessionWrapper from "@/app/components/sessionwrapper";
import { getServerSession } from "next-auth";
import Navbar from "@/app/components/navbar";

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
          <Navbar/>
            {children}
          </ToastProvider>

      </SessionWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/toasterProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UrgentTime",
  description: "urgentTime application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
      <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

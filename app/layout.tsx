import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import AdminProvider from "@/context/adminContext";


export const metadata: Metadata = {
  title: "NextGen It",
  description: "NextGen It Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AdminProvider>

          <Toaster position="bottom-center" />
          {children}
        </AdminProvider>

      </body>
    </html>
  );
}

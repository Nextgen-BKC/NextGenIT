import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';


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
        <Toaster position="bottom-center" />
        {children}

      </body>
    </html>
  );
}

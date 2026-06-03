import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Providers from "@/lib/providers/queryProviders";

export const metadata: Metadata = {
  title: "Itclub Butwal Kalika Campus - NextGen IT Club",
  description: "Itclub Butwal Kalika Campus - Learn programming, web development, and IT skills with our community of developers and tech enthusiasts",
  icons: {
    icon: "/logo.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>


          <Toaster position="bottom-center" />
          {children}
        </Providers>

      </body>
    </html>
  );
}

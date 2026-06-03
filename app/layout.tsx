import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Providers from "@/lib/providers/queryProviders";
import { SchemaMarkup } from "@/lib/schemas/SchemaMarkup";

export const metadata: Metadata = {
  title: "Itclub Butwal Kalika Campus - NextGen IT Club",
  description: "Itclub Butwal Kalika Campus - Learn programming, web development, and IT skills with our community of developers and tech enthusiasts",
  icons: {
    icon: "/logo.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Itclub Butwal Kalika Campus",
    description: "Learn IT, programming, and web development with our active community",
    type: "website",
    url: "https://itclub.butwalkalikacampus.edu.np",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Itclub Butwal Kalika Campus Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Itclub Butwal Kalika Campus",
    description: "Learn IT, programming, and web development",
    images: ["/logo.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <SchemaMarkup />
      </head>
      <body>
        <Providers>


          <Toaster position="bottom-center" />
          {children}
        </Providers>

      </body>
    </html>
  );
}

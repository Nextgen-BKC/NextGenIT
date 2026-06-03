import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "IT Skills Assessment Quiz | Itclub Butwal Kalika Campus",
  description: "Test your IT and programming knowledge with our interactive quiz. Perfect for students interested in joining Itclub Butwal.",
  keywords: "IT assessment, programming quiz, skill test, web development quiz",
  openGraph: {
    title: "IT Skills Assessment Quiz",
    description: "Test your IT skills and join our community",
    type: "website",
    url: "https://itclub.butwalkalikacampus.edu.np/entrance",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "IT Skills Assessment Quiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Skills Assessment Quiz",
    description: "Test your IT and programming skills",
    images: ["/logo.png"],
  },
};

interface EntranceLayoutProps {
  children: ReactNode;
}

export default function EntranceLayout({ children }: EntranceLayoutProps) {
  return <>{children}</>;
}

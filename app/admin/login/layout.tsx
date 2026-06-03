import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Login - Itclub Butwal Kalika Campus",
  description: "Secure admin login for Itclub Butwal Kalika Campus club management",
  robots: "noindex, nofollow",
};

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Portal - Itclub Butwal Kalika Campus",
  description: "Admin dashboard for managing events, members, and club activities at Itclub Butwal Kalika Campus",
  robots: "noindex, nofollow", // Prevent admin section from being indexed
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <>{children}</>;
}

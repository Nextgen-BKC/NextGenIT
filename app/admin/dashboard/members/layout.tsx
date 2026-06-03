import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Manage Members - Admin Dashboard | Itclub Butwal",
  description: "Manage club members and their information at Itclub Butwal Kalika Campus",
  robots: "noindex, nofollow",
};

interface MembersLayoutProps {
  children: ReactNode;
}

export default function MembersLayout({ children }: MembersLayoutProps) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Manage Events - Admin Dashboard | Itclub Butwal",
  description: "Create, edit, and manage club events for Itclub Butwal Kalika Campus",
  robots: "noindex, nofollow",
};

interface EventsLayoutProps {
  children: ReactNode;
}

export default function EventsLayout({ children }: EventsLayoutProps) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { ReactNode } from 'react';
import AdminClientLayout from '../_components/AdminClientLayout';

export const metadata: Metadata = {
  title: "Dashboard - Admin Portal | Itclub Butwal",
  description: "Manage events and members for Itclub Butwal Kalika Campus",
  robots: "noindex, nofollow",
};

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return <AdminClientLayout>{children}</AdminClientLayout>;
}


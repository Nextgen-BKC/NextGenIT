import { ReactNode } from 'react';
import AdminClientLayout from '../_components/AdminClientLayout';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return <AdminClientLayout>{children}</AdminClientLayout>;
}


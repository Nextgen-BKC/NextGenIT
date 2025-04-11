// File structure:
// /app/admins/layout.tsx - Main admin layout with sidebar
// /app/admins/members/page.tsx - Members management page
// /app/admins/events/page.tsx - Events management page
// /app/admins/_components/ - Shared components

// /app/admins/layout.tsx
"use client";
import { useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import SideNavigation from './_components/SideNavigation';
import toast from 'react-hot-toast';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Determine active section based on pathname
    const activeSection = pathname.includes('/events') ? 'events' : 'members';

    // Handle responsive behavior
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSignOut = async () => {
        try {
            localStorage.removeItem('userData');
            sessionStorage.removeItem('sessionData');

            const response = await fetch('/api/signout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Sign out failed');
            }

            router.push('/admins/login');
        } catch (error) {
            console.error('Sign out error:', error);
            toast.error('Failed to sign out. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Side Navigation */}
            <SideNavigation
                isSidebarOpen={isSidebarOpen}
                handleSignOut={handleSignOut}
            />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header with Menu Toggle */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu size={24} className="text-gray-600" />
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            {activeSection === 'members' ? 'Member Management' : 'Event Management'}
                        </h1>
                    </div>

                    {/* Page Content */}
                    {children}
                </div>
            </div>
        </div>
    );
}


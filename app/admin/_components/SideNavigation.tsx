"use client";
import { Users, Calendar, LogOut, CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SideNavigationProps {
    isSidebarOpen: boolean;
    handleSignOut: () => Promise<void>;
}

const SideNavigation = ({ isSidebarOpen, handleSignOut }: SideNavigationProps) => {
    if (!isSidebarOpen) return null;

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white border-r border-gray-700 z-50 transform transition-transform duration-300 lg:translate-x-0 overflow-y-auto">
            <div className="flex flex-col min-h-screen">
                {/* Logo Section */}
                <div className="logo flex items-center ml-3 p-4">
                    <Image src="/logo.png" height={200} width={200} alt="Club Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
                    <div className="ml-3">
                        <h5 className="font-bold text-orange-400">NextGen Innovator</h5>
                        <p className="text-gray-300">Admin Panel</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 mt-6">
                    <Link href="/admin/dashboard/members" className="flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 hover:text-white">
                        <Users size={20} className="mr-3" />
                        <span>Members</span>
                    </Link>
                    <Link href="/admin/dashboard/events" className="flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 hover:text-white">
                        <Calendar size={20} className="mr-3" />
                        <span>Events</span>
                    </Link>
                  
                </nav>

                {/* Sign Out Button - Fixed at Bottom */}
                <div className="mt-auto p-4 border-t border-gray-700">
                    <button
                        onClick={handleSignOut }
                        className="w-full flex items-center justify-center px-4 py-3 text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors font-medium"
                    >
                        <LogOut size={20} className="mr-2" />
                        <span>Sign Out</span>
                    </button>


                </div>
            </div>
        </div>
    );
};

export default SideNavigation;
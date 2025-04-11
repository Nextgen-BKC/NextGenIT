
"use client";
import { Users, Calendar, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SideNavigationProps {
    isSidebarOpen: boolean;
    handleSignOut: () => Promise<void>;
}

const SideNavigation = ({ isSidebarOpen, handleSignOut }: SideNavigationProps) => {
    if (!isSidebarOpen) return null;

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0">
            <div className="logo flex justify-center items-center ml-3">


                <Image src="/logo.png" height={200} width={200} alt="Club Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
                <div className="p-6">
                    <h5 className=" font-bold text-orange-500">NextGen Innovator</h5>
                    <p className="text-gray-600">Admin Panel</p>
                </div>
            </div>
            <div className="flex flex-col h-full">


                <nav className="flex-1 mt-6">
                    <Link href="/admin/dashboard/members" className={`flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 `}>
                        <Users size={20} className="mr-3" />
                        <span>Members</span>
                    </Link>
                    <Link href="/admin/dashboard/events" className={`flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 `}>
                        <Calendar size={20} className="mr-3" />
                        <span>Events</span>
                    </Link>
                </nav>

                <div className="p-6 border-t border-gray-200">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        <LogOut size={20} className="mr-3" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideNavigation;
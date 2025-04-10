import { Users, Calendar, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';

interface SideNavigationProps {
    activeSection: 'members' | 'events';
    setActiveSection: (section: 'members' | 'events') => void;
    isSidebarOpen: boolean;
    handleSignOut: () => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
    activeSection,
    setActiveSection,
    isSidebarOpen,
    handleSignOut
}) => {
    return (
        <div
            className={`bg-gray-900 text-white w-64 min-h-screen fixed left-0 top-0 transition-transform z-50 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <Image
                        src="/logo.png" // Replace with your logo path
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-lg"
                    />
                    <span className="text-xl font-bold">NextGen Club</span>
                </div>
            </div>

            <nav className="p-4 space-y-2">
                <button
                    onClick={() => setActiveSection('members')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeSection === 'members' ? 'bg-gray-700' : 'hover:bg-gray-800'
                        }`}
                >
                    <Users size={20} />
                    Members
                </button>

                <button
                    onClick={() => setActiveSection('events')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeSection === 'events' ? 'bg-gray-700' : 'hover:bg-gray-800'
                        }`}
                >
                    <Calendar size={20} />
                    Events
                </button>

                <div className="pt-8 mt-8 border-t border-gray-800">
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800">
                        <Settings size={20} />
                        Settings
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default SideNavigation;
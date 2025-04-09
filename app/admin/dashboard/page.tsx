"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Calendar, LogOut, Settings, Plus } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

const DashboardPage = () => {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState<'members' | 'events'>('members');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Mock data
    const members = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Member', status: 'Inactive' },
    ];

    const events = [
        { id: 1, title: 'Tech Conference', date: '2024-03-15', location: 'Convention Center', attendees: 120 },
        { id: 2, title: 'Workshop', date: '2024-03-20', location: 'Campus Lab', attendees: 45 },
    ];
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

            // Force page refresh to clear any cached state
            router.push('/admins/login');

        } catch (error) {
            console.error('Sign out error:', error);
            toast.error('Failed to sign out. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Side Navigation */}
            <div className={`bg-gray-900 text-white w-64 min-h-screen fixed left-0 top-0 transition-all ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <Image
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            src="/logo.png"
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
                        className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeSection === 'members' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                    >
                        <Users size={20} />
                        Members
                    </button>

                    <button
                        onClick={() => setActiveSection('events')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeSection === 'events' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
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

            {/* Main Content */}
            <div className="flex-1 ml-64 p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {activeSection === 'members' ? 'Member Management' : 'Event Management'}
                        </h1>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600">
                            <Plus size={18} />
                            Add {activeSection === 'members' ? 'Member' : 'Event'}
                        </button>
                    </div>

                    {/* Content */}
                    {activeSection === 'members' ? (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {members.map((member) => (
                                    <div key={member.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <h3 className="font-medium">{member.name}</h3>
                                            <p className="text-sm text-gray-600">{member.email}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {member.status}
                                                </span>
                                                <span className="text-sm text-gray-600">{member.role}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="text-orange-500 hover:text-orange-600 p-2">
                                                <Users size={18} />
                                            </button>
                                            <button className="text-red-500 hover:text-red-600 p-2">
                                                <LogOut size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {events.map((event) => (
                                    <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-orange-100 p-3 rounded-lg">
                                                <Calendar className="text-orange-500" size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium">{event.title}</h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {event.date}
                                                    </span>
                                                    <span className="flex items-center gap-1 mt-1">
                                                        <Users size={14} />
                                                        {event.attendees} attendees
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <button className="text-orange-500 hover:text-orange-600 p-2">
                                                <Calendar size={18} />
                                            </button>
                                            <button className="text-red-500 hover:text-red-600 p-2">
                                                <LogOut size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
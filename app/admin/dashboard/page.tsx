"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Plus } from 'lucide-react';
import SideNavigation from '../_components/SideNavigation';
import MemberManagement from '../_components/MemberManagement';
import EventManagement from '../_components/EventManagement';
import AddEditMemberModal from '../_components/modals/AddEditMemberModal';
import AddEditEventModal from '../_components/modals/AddEditEventModal';
import DeleteConfirmationModal from '../_components/modals/DeleteConfirmationModal';
import toast from 'react-hot-toast';
import { useAdmin } from '@/context/adminContext';


const Page = () => {
    const router = useRouter();
    const {
        members,
        events,
        loading,
        error,
        fetchMembers,
        fetchEvents,
        addMember,
        updateMember,
        deleteMember,
        addEvent,
        updateEvent,
        deleteEvent
    } = useAdmin();

    const [activeSection, setActiveSection] = useState<'members' | 'events'>('members');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [modal, setModal] = useState<{
        type: 'add' | 'edit' | 'delete' | null;
        section: 'members' | 'events' | null;
        itemId: string | null; // Changed from number to string
    }>({
        type: null,
        section: null,
        itemId: null
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Member',
        status: 'Active',
        userImage: '',
        title: '',
        date: '',
        location: '',
        description: "",
        eventImage: ''
    });

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

    // Fetch data on initial load
    useEffect(() => {
        fetchMembers();
        fetchEvents();
    }, [fetchMembers, fetchEvents]);

    // Open modal with appropriate data
    // Open modal with appropriate data
    const openModal = (
        type: 'add' | 'edit' | 'delete',
        section: 'members' | 'events',
        itemId?: string | null
    ) => {
        setModal({ type, section, itemId: itemId || null });

        // Reset form data for add
        if (type === 'add') {
            // ...reset code omitted...
        }

        // Prefill form data for edit
        if (type === 'edit' && itemId) {
            if (section === 'members') {
                const member = members.find(m => m.id === Number(itemId));
                if (member) {
                    setFormData(prev => ({
                        ...prev,
                        name: member.name,
                        email: member.email,
                        role: member.role,
                        status: member.status,
                        UserImage: member.image || ''  // Correct field name
                    }));
                    setPreviewImage(member.image || null);
                }
            } else {
                const event = events.find(e => e._id === itemId);
                if (event) {
                    setFormData(prev => ({
                        ...prev,
                        title: event.title,
                        date: event.date,
                        location: event.location,
                        EventImage: event.eventImage || '',  // <-- This line needs to be fixed
                        description: event.description || ''
                    }));
                    setPreviewImage(event.eventImage || null);
                }
            }
        }
    };

    // Close all modals
    const closeModal = () => {
        setModal({ type: null, section: null, itemId: null });
        setPreviewImage(null);
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle Cloudinary image upload
    const handleImageUpload = (imageUrl: string) => {
        setPreviewImage(imageUrl);
        if (modal.section === 'members') {
            setFormData(prev => ({ ...prev, userImage: imageUrl }));
        } else {
            setFormData(prev => ({ ...prev, eventImage: imageUrl }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (modal.section === 'events') {
                const eventData = {
                    title: formData.title,
                    date: formData.date,
                    location: formData.location,
                    eventImage: formData.eventImage || '/default-event.png',  // Use lowercase 'eventImage'
                    description: formData.description
                };

                if (modal.type === 'add') {
                    await addEvent(eventData);
                } else if (modal.type === 'edit' && modal.itemId) {
                    await updateEvent(modal.itemId, eventData);
                }
            } else if (modal.section === 'members') {
                const memberData = {
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                    status: formData.status,
                    userImage: formData.userImage || '/default-member.png'
                };

                if (modal.type === 'add') {
                    await addMember(memberData);
                } else if (modal.type === 'edit' && modal.itemId) {
                    await updateMember(Number(modal.itemId), memberData);
                }
            }
            closeModal();
            toast.success(`${modal.type === 'add' ? 'Added' : 'Updated'} successfully`);
        } catch (error) {
            console.error('Submission error:', error);
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        }
    };



    // Modified delete handler using context API
    const handleDelete = async () => {
        if (modal.type === 'delete' && modal.itemId) {
            try {
                if (modal.section === 'members') {
                    await deleteMember(Number(modal.itemId));
                } else {
                    await deleteEvent(modal.itemId);
                }
                toast.success(`${modal.section === 'members' ? 'Member' : 'Event'} deleted successfully`);
            } catch (error) {
                console.error('Delete error:', error);
                toast.error('Failed to delete. Please try again.');
            }
        }
        closeModal();
    };


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
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                isSidebarOpen={isSidebarOpen}
                handleSignOut={handleSignOut}
            />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header with Add Button */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
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
                        <button
                            className="bg-orange-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600"
                            onClick={() => openModal('add', activeSection)}
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Add</span>
                            {activeSection === 'members' ? 'Member' : 'Event'}
                        </button>
                    </div>

                    {/* Loading States and Error Handling */}
                    {activeSection === 'members' && loading.members && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">Loading members...</p>
                        </div>
                    )}

                    {activeSection === 'events' && loading.events && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">Loading events...</p>
                        </div>
                    )}

                    {activeSection === 'members' && error.members && (
                        <div className="text-center py-10">
                            <p className="text-red-500">Error: {error.members}</p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={fetchMembers}
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {activeSection === 'members' && loading.members && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">Loading members...</p>
                        </div>
                    )}

                    {activeSection === 'events' && loading.events && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">Loading events...</p>
                        </div>
                    )}

                    {activeSection === 'members' && error.members && (
                        <div className="text-center py-10">
                            <p className="text-red-500">Error: {error.members || 'Unknown error'}</p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={fetchMembers}
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {activeSection === 'events' && error.events && (
                        <div className="text-center py-10">
                            <p className="text-red-500">Error: {error.events || 'Unknown error'}</p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={fetchEvents}
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Content based on active section */}
                    {activeSection === 'members' && !loading.members && !error.members && (
                        <MemberManagement
                            members={members}
                            openModal={openModal}
                        />
                    )}

                    {activeSection === 'events' && !loading.events && !error.events && (
                        <EventManagement
                            events={events}
                            openModal={openModal}
                        />
                    )}
                </div>
            </div>

            {/* Modals */}
            {(modal.type === 'add' || modal.type === 'edit') && modal.section === 'members' && (
                <AddEditMemberModal
                    type={modal.type}
                    formData={formData}
                    previewImage={previewImage}
                    handleInputChange={handleInputChange}
                    handleImageUpload={handleImageUpload}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            )}

            {(modal.type === 'add' || modal.type === 'edit') && modal.section === 'events' && (
                <AddEditEventModal
                    type={modal.type}
                    formData={formData}
                    previewImage={previewImage}
                    handleInputChange={handleInputChange}
                    handleImageUpload={handleImageUpload}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            )}

            {modal.type === 'delete' && (
                <DeleteConfirmationModal
                    section={modal.section!}
                    handleDelete={handleDelete}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default Page;


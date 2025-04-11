// context/admin-context.tsx
"use client";
import { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface Member {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    userImage: string;
}

type Event = {
    _id: string;
    title: string;
    date: string;
    location: string;
    eventImage: string;
    description: string;
};

interface AdminContextType {
    members: Member[];
    events: Event[];
    loading: { members: boolean; events: boolean };
    error: { members: string | null; events: string | null };
    fetchMembers: () => Promise<void>;
    fetchEvents: () => Promise<void>;
    addMember: (member: Omit<Member, '_id'>) => Promise<void>;
    addEvent: (event: Omit<Event, '_id'>) => Promise<void>;
    updateMember: (id: string, member: Partial<Member>) => Promise<void>;
    deleteMember: (id: string) => Promise<void>;
    updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

const AdminProvider = ({ children }: { children: React.ReactNode }) => {

    const [members, setMembers] = useState<Member[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState({
        members: false,
        events: false
    });
    const [error, setError] = useState<{
        members: string | null;
        events: string | null;
    }>({ members: null, events: null });

    const handleError = (err: unknown) => {
        return err instanceof Error ? err.message : "An unknown error occurred";
    };

    // Fixed fetchMembers to update the state
    const fetchMembers = useCallback(async () => {
        setLoading(prev => ({ ...prev, members: true }));
        setError(prev => ({ ...prev, members: null }));
        try {
            const response = await fetch('/api/members');

            if (!response.ok) {
                throw new Error('Failed to fetch members');
            }

            const res = await response.json();

            if (!res || !res.data || !Array.isArray(res.data)) {
                throw new Error('Invalid response format');
            }

            // Set members in state with null checks
            setMembers(res.data.map((member: any) => ({
                _id: member?._id?.toString() || '',
                name: member?.name || '',
                email: member?.email || '',
                role: member?.role || 'Member',
                status: member?.status || 'Active',
                userImage: member?.userImage || ''
            })));

        } catch (err) {
            const errorMessage = handleError(err);
            setError(prev => ({ ...prev, members: errorMessage }));
            console.error('Fetch members error:', err);
        } finally {
            setLoading(prev => ({ ...prev, members: false }));
        }
    }, []);

    const fetchEvents = useCallback(async () => {
        setLoading(prev => ({ ...prev, events: true }));
        setError(prev => ({ ...prev, events: null }));
        try {
            const response = await fetch('/api/events');
            const res = await response.json();

            if (!response.ok) {
                throw new Error(res.message || 'Failed to fetch events');
            }

            if (!res || !res.data || !Array.isArray(res.data)) {
                throw new Error('Invalid events format');
            }

            // Transform the data to use eventImage consistently with null checks
            setEvents(res.data.map((event: any) => ({
                _id: event?._id?.toString() || '',
                title: event?.title || '',
                date: event?.date || '',
                location: event?.location || '',
                eventImage: event?.eventImage || '',
                description: event?.description || '',
                createdAt: event?.createdAt || '',
                updatedAt: event?.updatedAt || ''
            })));
        } catch (err) {
            const errorMessage = handleError(err);
            setError(prev => ({ ...prev, events: errorMessage }));
            console.error('Fetch events error:', err);
        } finally {
            setLoading(prev => ({ ...prev, events: false }));
        }
    }, []);

    const addMember = async (member: Omit<Member, '_id'>) => {
        try {
            const response = await fetch('/api/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(member)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to add member');
            }

            // Only update state if we have valid data
            if (data && data.data && data.data._id) {
                // Optimistic update
                setMembers(prev => [...prev, { ...member, _id: data.data._id }]);
            } else {
                // Refetch if we can't do an optimistic update
                await fetchMembers();
            }

            return data;
        } catch (err) {
            toast.error(handleError(err));
            throw err;
        }
    };

    const updateMember = async (id: string, member: Partial<Member>) => {
        try {
            const response = await fetch(`/api/members/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(member)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update member');
            }

            // Optimistic update
            setMembers(prev =>
                prev.map(m => m._id === id ? { ...m, ...member } : m)
            );

            return data;
        } catch (err) {
            toast.error(handleError(err));
            throw err;
        }
    };

    const deleteMember = async (id: string) => {
        try {
            const response = await fetch(`/api/members/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete member');
            }

            // Optimistic update
            setMembers(prev => prev.filter(m => m._id !== id));
            return data;
        } catch (err) {
            toast.error(handleError(err));
            throw err;
        }
    };

    const addEvent = async (event: Omit<Event, '_id'>) => {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event)
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to add event');
            }

            if (result && result.data && result.data._id) {
                setEvents(prev => [...prev, { ...result.data }]); // Optimistic update
                toast.success('Event added');
            } else {
                // Refetch if we can't do an optimistic update
                await fetchEvents();
                toast.success('Event added');
            }
        } catch (err) {
            toast.error(handleError(err));
            throw err;
        }
    };

    const updateEvent = async (id: string, event: Partial<Event>) => {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event)
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to update event');
            }

            setEvents(prev =>
                prev.map(e => e._id === id ? { ...e, ...event } : e)
            );
            toast.success('Event updated');
        } catch (err) {
            toast.error(handleError(err));
            throw err;
        }
    };

    const deleteEvent = async (id: string) => {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete event');
            }

            setEvents(prev => prev.filter(e => e._id !== id));
            toast.success('Event deleted');
        } catch (err) {
            toast.error(handleError(err));
            throw err;
        }
    };

    return (
        <AdminContext.Provider
            value={{
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
                deleteEvent,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export default AdminProvider;
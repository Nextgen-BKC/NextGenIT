// context/admin-context.tsx
"use client";
import { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

type Member = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    userImage: string;  // Changed from image
};

type Event = {
    _id: string;
    title: string;
    date: string;
    location: string;
    eventImage: string;  // Changed from image
    description: string;
};

interface AdminContextType {
    members: Member[];
    events: Event[];
    loading: { members: boolean; events: boolean };
    error: { members: string | null; events: string | null };
    fetchMembers: () => Promise<void>;
    fetchEvents: () => Promise<void>;
    addMember: (member: Omit<Member, 'id'>) => Promise<void>;
    addEvent: (event: Omit<Event, '_id'>) => Promise<void>;
    updateMember: (id: number, member: Partial<Member>) => Promise<void>;
    deleteMember: (id: number) => Promise<void>;
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

    const fetchMembers = useCallback(async () => {
        setLoading(prev => ({ ...prev, members: true }));
        setError(prev => ({ ...prev, members: null }));
        try {
            const response = await fetch('/api/members');
            if (!response.ok) throw new Error('Failed to fetch members');
            const data = await response.json();
            setMembers(data);
        } catch (err) {
            const message = handleError(err);
            setError(prev => ({ ...prev, members: message }));
            toast.error('Failed to load members');
        } finally {
            setLoading(prev => ({ ...prev, members: false }));
        }
    }, []);
    const fetchEvents = useCallback(async () => {
        setLoading(prev => ({ ...prev, events: true }));
        try {
            const response = await fetch('/api/events');
            const res = await response.json();

            if (!response.ok) {
                throw new Error(res.message || 'Failed to fetch events');
            }

            if (!Array.isArray(res.data)) {
                throw new Error('Invalid events format');
            }

            // Transform the data to use eventImage consistently
            setEvents(res.data.map((event: any) => ({
                _id: event._id.toString(),
                title: event.title,
                date: event.date,
                location: event.location,
                eventImage: event.eventImage || '',
                description: event.description,
                createdAt: event.createdAt,
                updatedAt: event.updatedAt
            })));
        } catch (err) {
            toast.error(handleError(err));
            console.error('Fetch events error:', err);
        } finally {
            setLoading(prev => ({ ...prev, events: false }));
        }
    }, []);



    const addMember = async (member: Omit<Member, 'id'>) => {
        try {
            const response = await fetch('/api/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(member)
            });
            if (!response.ok) throw new Error('Failed to add member');
            toast.success('Member added');
            await fetchMembers();
        } catch (err) {
            toast.error(handleError(err));
        }
    };

    const updateMember = async (id: number, member: Partial<Member>) => {
        try {
            const response = await fetch(`/api/members/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(member)
            });
            if (!response.ok) throw new Error('Failed to update member');
            toast.success('Member updated');
            await fetchMembers();
        } catch (err) {
            toast.error(handleError(err));
        }
    };

    const deleteMember = async (id: number) => {
        try {
            const response = await fetch(`/api/members/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete member');
            toast.success('Member deleted');
            await fetchMembers();
        } catch (err) {
            toast.error(handleError(err));
        }
    };

    // context/admin-context.tsx
    const addEvent = async (event: Omit<Event, '_id'>) => {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event)
            });
            const { data } = await response.json();
            setEvents(prev => [...prev, data]); // Optimistic update
            toast.success('Event added');
        } catch (err) {
            toast.error(handleError(err));
        }
    };

    const updateEvent = async (id: string, event: Partial<Event>) => {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event)
            });
            const { data } = await response.json();
            setEvents(prev =>
                prev.map(e => e._id === id ? { ...e, ...data } : e)
            );
            toast.success('Event updated');
        } catch (err) {
            toast.error(handleError(err));
        }
    };

    const deleteEvent = async (id: string) => {
        try {
            await fetch(`/api/events/${id}`, { method: 'DELETE' });
            setEvents(prev => prev.filter(e => e._id !== id));
            toast.success('Event deleted');
        } catch (err) {
            toast.error(handleError(err));
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
                deleteEvent
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
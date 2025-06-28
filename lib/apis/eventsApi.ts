import { getEvents } from "@/app/admin/dashboard/events/serverActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface Event {
    _id: string;
    title: string;
    date: string;
    location?: string;
    description?: string;
    eventImage?: string;
    time?: string;
}

export type EventInput = Omit<Event, '_id'>;

// Fetch events async function for server actions (if needed elsewhere)
export async function fetchEventsAsync(): Promise<Event[]> {
    const data = await getEvents();
    return data || [];
}

// React Query hook for fetching events
export function useEvents() {
    return useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: async () => {
            const data = await getEvents();
            return data || [];
        },
    });
}

// React Query hook for adding an event
export function useAddEvent(addEvent: (event: EventInput) => Promise<Event>) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (event: EventInput) => {
            const data = await addEvent(event);
            return data;
        },
        onSuccess: () => {
            toast.success("Event created successfully!");
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create event.");
        },
    });
}

// React Query hook for updating an event
export function useUpdateEvent(updateEvent: (id: string, event: Partial<EventInput>) => Promise<Event>) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, event }: { id: string; event: Partial<EventInput> }) => {
            const data = await updateEvent(id, event);
            return data;
        },
        onSuccess: () => {
            toast.success("Event updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update event.");
        },
    });
}

// React Query hook for deleting an event
export function useDeleteEvent(deleteEvent: (id: string) => Promise<string>) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const data = await deleteEvent(id);
            return data;
        },
        onSuccess: () => {
            toast.success("Event deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete event.");
        },
    });
} 
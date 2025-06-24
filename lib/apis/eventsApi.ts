export interface Event {
    _id: string;
    title: string;
    date: string;
    location: string;
    description?: string;
    eventImage?: string;
    time: string;
}

export type EventInput = Omit<Event, '_id'>;

export async function fetchEvents(): Promise<Event[]> {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error('Failed to fetch events');
    const data = await response.json();
    return data.data;
}

export async function addEvent(event: EventInput): Promise<Event> {
    const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
    });
    if (!response.ok) throw new Error('Failed to add event');
    const data = await response.json();
    return data.data;
}

export async function updateEvent(id: string, event: Partial<EventInput>): Promise<Event> {
    const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
    });
    if (!response.ok) throw new Error('Failed to update event');
    const data = await response.json();
    return data.data;
}

export async function deleteEvent(id: string): Promise<string> {
    const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete event');
    return id;
} 
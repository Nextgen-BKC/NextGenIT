"use client";
import { Edit, Trash2, Calendar } from 'lucide-react';
import Image from 'next/image';

interface EventProps {
    _id: string;
    title: string;
    date: string;
    location: string;
    description?: string;
    eventImage?: string;
    time: string; // Make time required here 
}

interface EventManagementProps {
    events: EventProps[];
    openModal: (type: 'add' | 'edit' | 'delete', itemId: string | null) => void;
}

const EventManagement: React.FC<EventManagementProps> = ({ events = [], openModal }) => {
    // Log the events to check its value
    console.log("Events data:", events);

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Array.isArray(events) && events.length > 0 ? (
                    events.map((event) => (
                        event && (
                            <div key={event._id} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                    <div className="w-full md:w-24 h-24 rounded-lg overflow-hidden">
                                        {event.eventImage ? (
                                            <Image
                                                src={event.eventImage}
                                                alt={event.title || 'Event image'}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex justify-center items-center rounded-lg">
                                                <span>No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold">{event.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {event.date}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                                        <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="text-blue-500 hover:text-blue-600 p-2"
                                        onClick={() => openModal('edit', event._id)}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-600 p-2"
                                        onClick={() => openModal('delete', event._id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 py-8">
                        No events available
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventManagement;
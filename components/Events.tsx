'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useEvents } from '@/lib/apis/useAdmin';



interface EventCardProps {
    image: string;
    title: string;
    date: string;
    time: string;
    location: string;
    isEntrance?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
    image,  
    title,
    date,
    time,
    location,
    isEntrance = false,
}) => {
    const handleClick = () => {
        if (!isEntrance) {
            toast('Events glimpses are on Facebook page!', {
                icon: null,
                style: {
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: '#FF6900',
                    color: '#fff',
                },
            });
        }
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
                <Image
                    src={image || '/default-event.png'}
                    alt={title}
                    height={200}
                    width={200}
                    className="object-cover w-full h-full"
                    priority
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                        <Calendar size={16} className="mr-2 text-orange-500" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-2 text-orange-500" />
                        <span>{time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-2 text-orange-500" />
                        <span>{location}</span>
                    </div>
                </div>
                <button
                    onClick={handleClick}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                    Glimpses
                </button>
            </div>
        </div>
    );
};

const Events = () => {
    const { data: events = [], isLoading, error } = useEvents();

    // Format the date from ISO string to readable format
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return "Invalid date";
            }
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch (err) {
            console.error("Date formatting error:", err);
            return dateString;
        }
    };

    const handleViewAll = () => {
        toast('More events coming soon!', {
            icon: null,
            style: {
                padding: '10px 16px',
                borderRadius: '8px',
                background: '#FF6900',
                color: '#fff',
            },
        });
    };

    return (
        <section id="events" className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Our <span className="text-orange-500">Events</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join us for exciting workshops, seminars, and competitions designed to enhance your skills and expand your network.
                    </p>
                </div>

                {isLoading && (
                    <div className="text-center py-10">
                        <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 mt-4">Loading events...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-10 px-4 mx-auto max-w-md bg-red-50 rounded-lg">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <p className="text-red-500 font-medium">Error: {error.message || error.toString()}</p>
                    </div>
                )}

                {!isLoading && !error && events.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event: any) => (
                            <EventCard
                                key={event._id}
                                image={event.eventImage}
                                title={event.title}
                                date={formatDate(event.date)}
                                time={event.time}
                                location={event.location}
                                isEntrance={event.title.includes("ENTRANCE") || event.title.includes("Entrance")}
                            />
                        ))}
                    </div>
                ) : (!isLoading && !error && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No events found.</p>
                    </div>
                ))}

                {!isLoading && !error && events.length > 0 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={handleViewAll}
                            className="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-200"
                        >
                            View All Events
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Events;
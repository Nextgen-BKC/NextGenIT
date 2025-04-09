'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface EventCardProps {
    image: string; // Changed from 'any' to string
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
                    src={image}
                    alt={title}
                    height={200}
                    width={200}
                    className="object-cover w-full h-full"
                    sizes="(max-width: px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
    const events = [
        {
            id: 1,
            image: "/CODING.jpg",
            title: "CODING COMPETITION",
            date: "Mar 11, 2024",
            time: "7:00 AM - 10:00 PM",
            location: "Computer Lab, BKC"
        },
        {
            id: 2,
            image: "/SKILL.jpg",
            title: "SKILL TEST COMPETITION",
            date: "Mar 5, 2024",
            time: "7:00 AM - 10:00 PM",
            location: "Computer Lab, BKC"
        },
        {
            id: 3,
            image: "/WORDPRESS.jpg",
            title: "WORDPRESS TRAINING",
            date: "Nov 22, 2024",
            time: "7:00 AM - 10:00 PM",
            location: "Computer Lab, BKC"
        },
        {
            id: 4,
            image: "/BCAINTRANCE.jpg",
            title: "BCA ENTRANCE MOCK TEST",
            date: "Aug 24, 2024",
            time: "7:00 AM - 10:00 PM",
            location: "Computer Lab, BKC",
            isEntrance: true
        },
        {
            id: 5,
            image: "/GIT.jpg",
            title: "GIT FOR PERSONAL USE",
            date: "Jul 18, 2024",
            time: "7:00 AM - 10:00 AM",
            location: "Seminar Hall, BKC"
        },
        {
            id: 6,
            image: "/RESUME.jpg",
            title: "RESUME BUILDING TRAINING",
            date: "May 25, 2024",
            time: "7:00 AM - 10:00 AM",
            location: "Butwal Kalika Campus"
        }
    ];

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            image={event.image}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            location={event.location}
                            isEntrance={event.isEntrance}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={handleViewAll}
                        className="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-200"
                    >
                        View All Events
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Events;
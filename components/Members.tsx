'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { getMembers } from '@/app/admin/dashboard/members/serverActions';

interface MemberData {
    _id: string;
    name: string;
    email: string;
    userImage: string;
}

interface MemberCardProps {
    image: string;
    name: string;
    email: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ image, name, email }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="relative mb-4 rounded-full overflow-hidden w-48 h-48 border-4 border-orange-100">
                <Image
                    src={image || '/default-member.png'}
                    alt={name}
                    height={200}
                    width={200}
                    priority
                    className="object-cover"

                />
            </div>

            <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
                <div className="flex items-center justify-center text-gray-600 text-sm">
                    <Mail size={14} className="mr-1 text-orange-400" />
                    <span className="truncate max-w-xs">{email}</span>
                </div>
            </div>
        </div>
    );
};

const Members = () => {
    const [members, setMembers] = useState<MemberData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoading(true);
                const data = await getMembers();
                setMembers(data || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching members:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    return (
        <section id="members" className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Our <span className="text-orange-500">Team</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Meet our dedicated team members who work tirelessly to create opportunities and foster growth in our community.
                    </p>
                </div>

                {loading && (
                    <div className="text-center py-10">
                        <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 mt-4">Loading members...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-10 px-4 mx-auto max-w-md bg-red-50 rounded-lg">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <p className="text-red-500 font-medium">Error: {error}</p>
                    </div>
                )}

                {!loading && !error && members.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {members.map((member) => (
                            <MemberCard
                                key={member._id}
                                image={member.userImage}
                                name={member.name}
                                email={member.email}
                            />
                        ))}
                    </div>
                ) : (!loading && !error && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No team members found.</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Members;
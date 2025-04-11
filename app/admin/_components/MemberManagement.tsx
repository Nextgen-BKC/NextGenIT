import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface MemberProps {
    _id: string;  // Changed from id: number to _id: string for MongoDB
    name: string;
    email: string;
    role: string;
    status: string;
    userImage: string;
}

interface MemberManagementProps {
    members: MemberProps[];
    openModal: (
        type: "add" | "edit" | "delete",
        section: "members" | "events",
        itemId?: string | null
    ) => void;
}

const MemberManagement: React.FC<MemberManagementProps> = ({ members, openModal }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {members.map((member) => (
                    <div key={member._id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                            <Image
                                src={member.userImage || "/api/placeholder/48/48"}
                                alt={member.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.email}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${member.status === 'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {member.status}
                                </span>
                                <span className="text-sm text-gray-600">{member.role}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="text-blue-500 hover:text-blue-600 p-2"
                                onClick={() => openModal('edit', 'members', member._id)}
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-600 p-2"
                                onClick={() => openModal('delete', 'members', member._id)}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberManagement;
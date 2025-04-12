// MemberManagement.tsx - Improved responsive design
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
        <div className="bg-white rounded-xl shadow-lg p-3 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                {members.map((member) => (
                    <div key={member._id} className="flex flex-col sm:flex-row items-start sm:items-center p-3 md:p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 rounded-full overflow-hidden mb-3 sm:mb-0 sm:mr-4 flex-shrink-0">
                            <Image
                                src={member.userImage || "/api/placeholder/48/48"}
                                alt={member.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                            <h3 className="font-medium truncate">{member.name}</h3>
                            <p className="text-sm text-gray-600 truncate">{member.email}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${member.status === 'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {member.status}
                                </span>
                                <span className="text-sm text-gray-600">{member.role}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 self-end sm:self-center mt-2 sm:mt-0">
                            <button
                                className="text-blue-500 hover:text-blue-600 p-1 sm:p-2"
                                onClick={() => openModal('edit', 'members', member._id)}
                                aria-label="Edit member"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-600 p-1 sm:p-2"
                                onClick={() => openModal('delete', 'members', member._id)}
                                aria-label="Delete member"
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
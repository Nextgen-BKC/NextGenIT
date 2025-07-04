"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import MemberManagement from '../../_components/MemberManagement';
import AddEditMemberModal from '../../_components/modals/AddEditMemberModal';
import DeleteConfirmationModal from '../../_components/modals/DeleteConfirmationModal';
import toast from 'react-hot-toast';
import { useMembers, useAddMember, useUpdateMember, useDeleteMember } from '@/lib/apis/useAdmin';
import type { Member, MemberInput } from '@/lib/apis/membersApi';

interface ModalState {
    type: 'add' | 'edit' | 'delete' | null;
    itemId: string | null;
}

const Page = () => {
    const {
        data: members = [],
        isLoading: membersLoading,
        isError: membersError,
        refetch: fetchMembers
    } = useMembers();
    const addMemberMutation = useAddMember();
    const updateMemberMutation = useUpdateMember();
    const deleteMemberMutation = useDeleteMember();

    const [modal, setModal] = useState<ModalState>({
        type: null,
        itemId: null
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [formData, setFormData] = useState<MemberInput>({
        name: '',
        email: '',
        role: 'Member',
        status: 'Active',
        userImage: ''
    });

    // Fetch data on initial load
    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    // Open modal with appropriate data
    const openModal = (type: 'add' | 'edit' | 'delete', itemId: string | null = null) => {
        setModal({ type, itemId });

        // Reset form data for add
        if (type === 'add') {
            setFormData({
                name: '',
                email: '',
                role: 'Member',
                status: 'Active',
                userImage: ''
            });
            setPreviewImage(null);
        }

        // Prefill form data for edit
        if (type === 'edit' && itemId) {
            const member = members.find((m: Member) => m._id === itemId);
            if (member) {
                setFormData({
                    name: member.name,
                    email: member.email,
                    role: member.role,
                    status: member.status,
                    userImage: member.userImage || ''
                });
                setPreviewImage(member.userImage || null);
            }
        }
    };

    // Close all modals
    const closeModal = () => {
        setModal({ type: null, itemId: null });
        setPreviewImage(null);
    };

    // Handle form input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle Cloudinary image upload
    const handleImageUpload = (imageUrl: string) => {
        setPreviewImage(imageUrl);
        setFormData(prev => ({ ...prev, userImage: imageUrl }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const memberData: MemberInput = {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: formData.status,
                userImage: formData.userImage || '/default-member.png'
            };

            if (modal.type === 'add') {
                await addMemberMutation.mutateAsync(memberData);
            } else if (modal.type === 'edit' && modal.itemId) {
                await updateMemberMutation.mutateAsync({ id: modal.itemId, member: memberData });
            }
            closeModal();
            toast.success(`${modal.type === 'add' ? 'Added' : 'Updated'} successfully`);
        } catch (error) {
            console.error('Submission error:', error);
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const handleDelete = async () => {
        if (modal.type === 'delete' && modal.itemId) {
            try {
                await deleteMemberMutation.mutateAsync(modal.itemId);
                toast.success('Member deleted successfully');
            } catch (error) {
                console.error('Delete error:', error);
                toast.error('Failed to delete. Please try again.');
            }
        }
        closeModal();
    };

    return (
        <>
            {/* Add Button */}
            <div className="flex justify-end mb-8">
                <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600"
                    onClick={() => openModal('add')}
                >
                    <Plus size={18} />
                    <span>Add Member</span>
                </button>
            </div>

            {/* Loading States and Error Handling */}
            {membersLoading && (
                <div className="text-center py-10">
                    <p className="text-gray-500">Loading members...</p>
                </div>
            )}

            {membersError && (
                <div className="text-center py-10">
                    <p className="text-red-500">Error loading members.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => fetchMembers()}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Members List */}
            {!membersLoading && !membersError && (
                <MemberManagement
                    members={members as any}
                    openModal={(type, section, itemId) => openModal(type, itemId)}
                />
            )}

            {/* Modals */}
            {(modal.type === 'add' || modal.type === 'edit') && (
                <AddEditMemberModal
                    type={modal.type}
                    formData={formData}
                    previewImage={previewImage}
                    handleInputChange={handleInputChange}
                    handleImageUpload={handleImageUpload}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            )}

            {modal.type === 'delete' && (
                <DeleteConfirmationModal
                    section="members"
                    handleDelete={handleDelete}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default Page;
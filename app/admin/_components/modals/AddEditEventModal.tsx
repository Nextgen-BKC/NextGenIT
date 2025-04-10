// File: app/admin/components/modals/AddEditEventModal.tsx
"use client";
import { X, Save } from 'lucide-react';
import CloudinaryUploader from '../CloudinaryUploader';
import { useAdmin } from '@/context/adminContext';

interface AddEditEventModalProps {
    type: 'add' | 'edit';
    formData: {
        title: string;
        description: string;
        date: string;
        location: string;
        eventImage: string;
    };
    previewImage: string | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Fix for description
    handleImageUpload: (url: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    closeModal: () => void;
    eventId?: string; // Add for edit mode
}

const AddEditEventModal: React.FC<AddEditEventModalProps> = ({
    type,
    formData,
    previewImage,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    closeModal
}) => {
    const { loading } = useAdmin();

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">
                        {type === 'add' ? 'Add New Event' : 'Edit Event'}
                    </h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <CloudinaryUploader
                            onImageUpload={handleImageUpload}
                            previewImage={previewImage || formData.eventImage}
                            aspectRatio="rectangle"
                            placeholderText="Upload Event Banner"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            required
                            disabled={loading.events}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg h-32"
                            required
                            disabled={loading.events}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            required
                            disabled={loading.events}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            required
                            disabled={loading.events}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            onClick={closeModal}
                            disabled={loading.events}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2 disabled:opacity-50"
                            disabled={loading.events}
                        >
                            <Save size={18} />
                            {loading.events ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditEventModal;
import { X, Save } from 'lucide-react';
import CloudinaryUploader from '../CloudinaryUploader';

interface AddEditMemberModalProps {
    type: 'add' | 'edit';
    formData: {
        name: string;
        email: string;
        role: string;
        status: string;
        userImage: string;
    };
    previewImage: string | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleImageUpload: (url: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    closeModal: () => void;
}

const AddEditMemberModal: React.FC<AddEditMemberModalProps> = ({
    type,
    formData,
    previewImage,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    closeModal
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">
                        {type === 'add' ? 'Add New Member' : 'Edit Member'}
                    </h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4 flex flex-col items-center">
                        <CloudinaryUploader
                            onImageUpload={handleImageUpload}
                            previewImage={previewImage || formData.userImage}
                            aspectRatio="circle"
                            placeholderText="Upload Profile Photo"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="Admin">Admin</option>
                            <option value="Member">Member</option>
                            <option value="Guest">Guest</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
                        >
                            <Save size={18} />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditMemberModal;




interface DeleteConfirmationModalProps {
    section: 'members' | 'events';
    handleDelete: () => void;
    closeModal: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    section,
    handleDelete,
    closeModal
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this {section === 'members' ? 'member' : 'event'}?
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;

// File: app/admin/page.tsx - Missing imports update
// At the top of your main page file, add:
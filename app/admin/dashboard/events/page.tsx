

"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Plus } from "lucide-react";
import EventManagement from "../../_components/EventManagement";
import AddEditEventModal from "../../_components/modals/AddEditEventModal";
import DeleteConfirmationModal from "../../_components/modals/DeleteConfirmationModal";
import toast from "react-hot-toast";
import { useAdmin } from "@/context/adminContext";

interface ModalState {
  type: "add" | "edit" | "delete" | null;
  itemId: string | null;
}

interface EventFormData {
  title: string;
  date: string;
  location: string;
  description: string;
  eventImage: string;
}

const Page = () => {
  const {
    events,
    loading,
    error,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useAdmin();

  const [modal, setModal] = useState<ModalState>({ type: null, itemId: null });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: "",
    location: "",
    description: "",
    eventImage: "",
  });

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const openModal = (
    type: "add" | "edit" | "delete",
    itemId: string | null = null
  ) => {
    setModal({ type, itemId });

    if (type === "add") {
      setFormData({
        title: "",
        date: "",
        location: "",
        description: "",
        eventImage: "",
      });
      setPreviewImage(null);
    }

    if (type === "edit" && itemId) {
      const event = events.find((e) => e._id === itemId);
      if (event) {
        setFormData({
          title: event.title,
          date: event.date,
          location: event.location,
          description: event.description || "",
          eventImage: event.eventImage || "",
        });
        setPreviewImage(event.eventImage || null);
      }
    }
  };

  const closeModal = () => {
    setModal({ type: null, itemId: null });
    setPreviewImage(null);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setFormData((prev) => ({ ...prev, eventImage: imageUrl }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const eventData = {
        title: formData.title,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        eventImage: formData.eventImage || "/default-event.png",
      };

      if (modal.type === "add") {
        await addEvent(eventData);
      } else if (modal.type === "edit" && modal.itemId) {
        await updateEvent(modal.itemId, eventData);
      }

      closeModal();
      toast.success(`${modal.type === "add" ? "Added" : "Updated"} successfully`);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleDelete = async () => {
    if (modal.type === "delete" && modal.itemId) {
      try {
        await deleteEvent(modal.itemId);
        toast.success("Event deleted successfully");
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete. Please try again.");
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
          onClick={() => openModal("add")}
        >
          <Plus size={18} />
          <span>Add Event</span>
        </button>
      </div>

      {/* Loading & Error Handling */}
      {loading.events && (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading events...</p>
        </div>
      )}

      {error.events && (
        <div className="text-center py-10">
          <p className="text-red-500">Error: {error.events}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={fetchEvents}
          >
            Retry
          </button>
        </div>
      )}

      {/* Events List */}
      {!loading.events && !error.events && (
        <EventManagement
          events={events}
          openModal={(type, itemId) => openModal(type, itemId)}
        />
      )}

      {/* Modals */}
      {(modal.type === "add" || modal.type === "edit") && (
        <AddEditEventModal
          type={modal.type}
          formData={formData}
          previewImage={previewImage}
          handleInputChange={handleInputChange}
          handleImageUpload={handleImageUpload}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          loading={loading.events}
        />
      )}

      {modal.type === "delete" && (
        <DeleteConfirmationModal
          section="events"
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Page;
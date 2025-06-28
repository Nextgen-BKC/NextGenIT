"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Plus } from "lucide-react";
import EventManagement from "../../_components/EventManagement";
import AddEditEventModal from "../../_components/modals/AddEditEventModal";
import DeleteConfirmationModal from "../../_components/modals/DeleteConfirmationModal";
import toast from "react-hot-toast";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '@/lib/apis/useAdmin';
import type { Event, EventInput } from '@/lib/apis/eventsApi';

interface ModalState {
  type: "add" | "edit" | "delete" | null;
  itemId: string | null;
}

const Page = () => {
  const {
    data: events = [],
    isLoading: eventsLoading,
    isError: eventsError,
    refetch: fetchEvents
  } = useEvents();
  const addEventMutation = useAddEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const [modal, setModal] = useState<ModalState>({ type: null, itemId: null });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<EventInput>({
    title: "",
    date: "",
    location: "",
    description: "",
    eventImage: "",
    time: "",
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
      // Initialize with today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        title: "",
        date: today,
        location: "",
        description: "",
        eventImage: "",
        time: "",
      });
      setPreviewImage(null);
    }

    if (type === "edit" && itemId) {
      const event = events.find((e: Event) => e._id === itemId);
      if (event) {
        // Format the date properly for form input
        let formattedDate = "";
        try {
          const date = new Date(event.date);
          if (!isNaN(date.getTime())) {
            formattedDate = date.toISOString().split('T')[0];
          }
        } catch (error) {
          console.error("Date formatting error:", error);
          formattedDate = event.date;
        }

        setFormData({
          title: event.title || "",
          date: formattedDate,
          location: event.location || "",
          description: event.description || "",
          eventImage: event.eventImage || "",
          time: event.time || "",
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
      const eventData: EventInput = {
        title: formData.title,
        date: formData.date,
        location: formData.location,
        description: formData.description || "",
        eventImage: formData.eventImage || "/default-event.png",
        time: formData.time || "",
      };

      if (modal.type === "add") {
        await addEventMutation.mutateAsync(eventData);
      } else if (modal.type === "edit" && modal.itemId) {
        await updateEventMutation.mutateAsync({ id: modal.itemId, event: eventData });
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
        await deleteEventMutation.mutateAsync(modal.itemId);
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
      {eventsLoading && (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading events...</p>
        </div>
      )}

      {eventsError && (
        <div className="text-center py-10">
          <p className="text-red-500">Error loading events.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => fetchEvents()}
          >
            Retry
          </button>
        </div>
      )}

      {/* Events List */}
      {!eventsLoading && !eventsError && (
        <EventManagement
          events={events as any}
          openModal={(type, itemId) => openModal(type, itemId)}
        />
      )}

      {/* Modals */}
      {(modal.type === "add" || modal.type === "edit") && (
        <AddEditEventModal
          type={modal.type}
          formData={{
            ...formData,
            description: formData.description || "",
            eventImage: formData.eventImage || "",
            location: formData.location || "",
            time: formData.time || ""
          }}
          previewImage={previewImage}
          handleInputChange={handleInputChange}
          handleImageUpload={handleImageUpload}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          loading={eventsLoading}
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
"use server";
import dbConnect from "@/lib/dbCon";
import Events from "@/models/eventsModel";

export async function getEvents() {
  await dbConnect();
  const events = await Events.find().lean();
  return events.map(event => ({
    ...event,
    _id: event._id.toString(),
    date: new Date(event.date).toISOString()
  }));
}

export async function addEvent({ title, description, date, location, eventImage, time }: {
  title: string;
  description: string;
  date: string;
  location: string;
  eventImage?: string;
  time?: string;
}) {
  await dbConnect();
  if (!title || !description) {
    throw new Error('Title and description are required');
  }
  const newEvent = await Events.create({
    title,
    description,
    date,
    location,
    eventImage: eventImage || "/default-event.png",
    time: time || "",
  });
  return { ...newEvent.toObject(), _id: newEvent._id.toString() };
}

export async function updateEvent(id: string, event: any) {
  await dbConnect();
  const updatedEvent = await Events.findByIdAndUpdate(id, event, {
    new: true,
    runValidators: true,
  });
  if (!updatedEvent) throw new Error("Event not found");
  return { ...updatedEvent.toObject(), _id: updatedEvent._id.toString() };
}

export async function deleteEvent(id: string) {
  await dbConnect();
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid event ID format");
  }
  const deletedEvent = await Events.findByIdAndDelete(id);
  if (!deletedEvent) throw new Error("Event not found");
  return { ...deletedEvent.toObject(), _id: deletedEvent._id.toString() };
} 
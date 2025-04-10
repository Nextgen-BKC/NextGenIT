import dbConnect from "@/lib/dbCon";

import Events from "@/models/eventsModel";
import { NextRequest, NextResponse } from "next/server";

// PUT: Update an event
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updatedEvent = await Event.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE: Remove an event

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    // No need to await params - it's already available
    const { id } = await params;

    // Validate ID format if needed
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { message: 'Invalid event ID format' },
        { status: 400 }
      );
    }

    const deletedEvent = await Events.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json(
        { message: 'Event not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Event deleted successfully', 
        data: deletedEvent.toObject() // Convert Mongoose document to plain object
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('DELETE /events/:id error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }}
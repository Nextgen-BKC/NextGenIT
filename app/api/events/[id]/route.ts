import dbConnect from "@/lib/dbCon";
import Events from "@/models/eventsModel";
import { NextRequest, NextResponse } from "next/server";

// PUT: Update an event


export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } =await params;
    const body = await req.json();

    const updatedEvent = await Events.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: "Event updated successfully", 
      data: updatedEvent 
    });
  } catch (error) {
    console.error("PUT /events/:id error:", error);
    return NextResponse.json(
      { message: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE: Remove an event
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } =await params;

    // Optional: Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { message: "Invalid event ID format" },
        { status: 400 }
      );
    }

    const deletedEvent = await Events.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Event deleted successfully",
        data: deletedEvent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /events/:id error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
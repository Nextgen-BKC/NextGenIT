
import dbConnect from "@/lib/dbCon";
import Events from "@/models/eventsModel";
import { NextRequest, NextResponse } from "next/server";

type dataType = {
  title: string;  
  description: string;
  date: Date;
  location: string;
  eventImage: string;
  time: string;
};



export async function GET() {
  try {
    await dbConnect();

    const events = await Events.find().lean();
    const serializedEvents = events.map(event => ({
      ...event,
      _id: event._id.toString(),
      date: new Date(event.date).toISOString()
    }));

    return NextResponse.json({ data: serializedEvents }, { status: 200 });
  } catch (error) {
    console.error('GET /events error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST: Create new event
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body: dataType = await req.json();
    const { title, description, date, location, eventImage, time } = body;
    console.log("Received event data:", body);

    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and description are required' }, 
        { status: 400 }
      );
    }

    const newEvent = await Events.create({
      title,
      description,
      date,
      location,
      eventImage: eventImage || "/default-event.png",
      time: time || "",
    });

    // Make sure to return the created event with proper data structure
    return NextResponse.json(
      { 
        message: 'Event created successfully', 
        data: {
          ...newEvent.toObject(),
          _id: newEvent._id.toString()
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST /events error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Failed to create event: ${error.message}` }, 
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}


import dbConnect from "@/lib/dbCon";
import Events from "@/models/eventsModel";
import { NextRequest, NextResponse } from "next/server";

type dataType = {
  title: string;  
  description: string;
  date: Date;
  location: string;
  eventImage: string;
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
    const { title, description, date, location, eventImage } = body;
    console.log(body);
    if (!title || !description|| !eventImage) {
      return NextResponse.json(
        { message: 'All fields are required' }, 
        { status: 400 }
      );
    }

    // POST handler
const newEvent = await Events.create({
  title,
  description,
  date,
  location,
  eventImage,
});

    return NextResponse.json(
      { message: 'Event created successfully', newEvent },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST /events error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

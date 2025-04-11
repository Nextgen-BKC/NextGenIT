import mongoose, { Schema, Model, Document } from 'mongoose';

// Interface for the event properties (no _id here)
interface IEvent {
  title: string;
  description?: string;
  date: Date;
  location?: string;
  eventImage?: string;
  time?: string;
}

// Interface combining IEvent with Mongoose Document
interface IEventDocument extends IEvent, Document {
  _id: string; // This will be stringified via toJSON transform
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const EventSchema = new Schema<IEventDocument>(
  {
    title: { 
      type: String, 
      required: [true, 'Title is required'] 
    },
    description: { 
      type: String 
    },
    date: { 
      type: Date,
      required: [true, 'Date is required'] 
    },
    location: { 
      type: String 
    },
    eventImage: { 
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  }, 
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret._id = ret._id.toString();
        return ret;
      }
    }
  }
);

// Type for Model
type EventModel = Model<IEventDocument>;

// Model creation/retrieval
const Event: EventModel = mongoose.models.Event || mongoose.model<IEventDocument>('Event', EventSchema);

export default Event;
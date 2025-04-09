import mongoose, { Schema, models, model } from 'mongoose';

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true });

export default models.Event || model('Event', EventSchema);

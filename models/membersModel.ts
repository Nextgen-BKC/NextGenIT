import mongoose, { Schema, models, model } from 'mongoose';

const MemberSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    eventsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
}, { timestamps: true });

export default models.Member || model('Member', MemberSchema);

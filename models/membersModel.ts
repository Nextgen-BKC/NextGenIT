import mongoose, { Schema } from 'mongoose';

export interface IMember {
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Guest';
  status: 'Active' | 'Inactive';
  userImage: string;
}

const MemberSchema = new Schema<IMember>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    role: {
      type: String,
      enum: ['Admin', 'Member', 'Guest'],
      default: 'Member',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    userImage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Check if model already exists to prevent overwrite during hot reload
const Member = mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema);

export default Member;
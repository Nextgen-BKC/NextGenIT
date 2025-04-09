// models/userModel.ts
import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}, {
  timestamps: true
});

export default mongoose.models.User as mongoose.Model<UserDocument> || 
  mongoose.model<UserDocument>('User', userSchema);
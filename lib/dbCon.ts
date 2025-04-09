import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}


const dbConnect = async (): Promise<typeof mongoose> => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }

    // Connect to MongoDB
    const connection = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // Correct syntax for this option
    });

    console.log('✅ Database connected successfully');
    return connection;

  } catch (error) {
    console.error('❌ Database connection failed', error);
    throw new Error('Database connection error');
  }
};

export default dbConnect;

import mongoose from 'mongoose';

export async function initMongoConnection() {
  try {
    const connectionString = process.env.MONGODB_URI; // Читання з process.env

    if (!connectionString) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(connectionString);

    console.log('MongoDB connection successfully established!');
  } catch (error) {
    console.error('Error while setting up MongoDB connection:', error.message);
    throw error;
  }
}

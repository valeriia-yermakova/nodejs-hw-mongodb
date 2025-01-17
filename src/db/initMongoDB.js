import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export async function initMongoConnection() {
  try {
    const connectionString = env('MONGODB_URI'); // Використовуйте один URI
    if (!connectionString) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connection successfully established!');
  } catch (error) {
    console.error('Error while setting up mongo connection:', error.message);
    throw error;
  }
}

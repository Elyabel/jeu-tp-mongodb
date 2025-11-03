import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = "mongodb+srv://jade:ML038q701TI6thJF@cluster0.okv1hb6.mongodb.net/?appName=Cluster0";

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected:', MONGO_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

import mongoose, { Schema, Document } from 'mongoose';

export interface IGame extends Document {
  title: string;
  description?: string;
  genre?: string;
  platform?: string;
  rating?: number; // 0..10
  createdAt: Date;
}

const GameSchema: Schema = new Schema({
  title: { type: String, required: true, index: true },
  description: { type: String },
  genre: { type: String, index: true },
  platform: { type: String },
  rating: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export const GameModel = mongoose.model<IGame>('Game', GameSchema);

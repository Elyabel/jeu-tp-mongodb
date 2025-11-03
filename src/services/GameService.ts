import { GameModel, IGame } from '../models/Game';
import { Types } from 'mongoose';

export class GameService {
  async create(payload: Partial<IGame>): Promise<IGame> {
    const game = new GameModel(payload);
    return await game.save();
  }

  async findById(id: string): Promise<IGame | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return await GameModel.findById(id).exec();
  }

  async list(page = 1, limit = 10): Promise<{ items: IGame[]; total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      GameModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      GameModel.countDocuments().exec()
    ]);
    return { items, total };
  }

  async search(query: { keyword?: string; genre?: string; maxRating?: number; page?: number; limit?: number }) {
    const { keyword, genre, maxRating, page = 1, limit = 10 } = query;
    const filters: any = {};

    if (genre) filters.genre = genre;
    if (typeof maxRating !== 'undefined') filters.rating = { $lte: maxRating };

    const and: any[] = [];

    if (keyword) {
      const regex = new RegExp(keyword, 'i');
      and.push({ $or: [{ title: regex }, { description: regex }] });
    }

    if (Object.keys(filters).length > 0) {
      and.push(filters);
    }

    const mongoQuery = and.length > 0 ? { $and: and } : {};

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      GameModel.find(mongoQuery).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      GameModel.countDocuments(mongoQuery).exec()
    ]);

    return { items, total };
  }
}

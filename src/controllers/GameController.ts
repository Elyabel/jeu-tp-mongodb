import { Request, Response } from 'express';
import { GameService } from '../services/GameService';

const service = new GameService();

export class GameController {
  async create(req: Request, res: Response) {
    try {
      const doc = await service.create(req.body);
      return res.status(201).json(doc);
    } catch (err: any) {
      return res.status(500).json({ message: err.message || 'Erreur serveur' });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const doc = await service.findById(id);
    if (!doc) return res.status(404).json({ message: 'Jeu non trouvé' });
    return res.json(doc);
  }

  async list(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await service.list(page, limit);
    return res.json(result);
  }

  async search(req: Request, res: Response) {
    const keyword = req.query.keyword as string | undefined;
    const genre = req.query.genre as string | undefined;
    const maxRating = req.query.maxRating ? Number(req.query.maxRating) : undefined;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const result = await service.search({ keyword, genre, maxRating, page, limit });
    return res.json(result);
  }
}

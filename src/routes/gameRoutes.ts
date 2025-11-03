import { Router } from 'express';
import { GameController } from '../controllers/GameController';

const router = Router();
const controller = new GameController();

router.post('/items', (req, res) => controller.create(req, res));
router.get('/items/:id', (req, res) => controller.getById(req, res));
router.get('/items', (req, res) => controller.list(req, res));
router.get('/search', (req, res) => controller.search(req, res));

export default router;

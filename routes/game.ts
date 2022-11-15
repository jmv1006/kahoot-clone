import express from 'express';
const router = express.Router();
import { createGame, getAll, getSpecific } from '../controllers/game-controller';

router.get('/', getAll);
router.post('/', createGame);

router.get('/:id', getSpecific);

export default router;

import express from 'express';
const router = express.Router();
import { createGame, getAll } from '../controllers/game-controller';
import { createQuestions, getGameQuestions } from '../controllers/question-controller';
import checkGameExists from '../middleware/gameExists';

router.get('/', getAll);
router.post('/', createGame);

router.get('/:gameId/questions', checkGameExists, getGameQuestions)
router.post('/:gameId/questions', checkGameExists, createQuestions)

export default router;

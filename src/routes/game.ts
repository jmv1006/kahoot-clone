import express from 'express';
const router = express.Router();
import { createGame, getAll } from '../controllers/game-controller';
import { createQuestions, getGameQuestions, updateQuestions } from '../controllers/question-controller';
import checkGameExists from '../middleware/gameExists';

router.get('/', getAll);
router.post('/', createGame);

router.get('/:game_id/questions', checkGameExists, getGameQuestions);
router.post('/:game_id/questions', checkGameExists, createQuestions);
router.put('/:game_id/questions', checkGameExists, updateQuestions);

export default router;

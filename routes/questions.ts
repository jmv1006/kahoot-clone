import express from 'express';
const router = express.Router();
import { createQuestions } from '../controllers/question-controller';
import checkGameExists from '../middleware/gameExists';

router.post('/:gameId', createQuestions);

export default router;

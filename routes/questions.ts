import express from 'express';
const router = express.Router();
import { createQuestions } from '../controllers/question-controller';

router.post('/:gameId/questions', createQuestions);

export default router;

import { Request, Response } from 'express';
import Question from '../config/interfaces/question';
import QuestionService from '../services/question-service';
import NewQuestionSchema from '../config/joi-schemas/question-answer';
import QuestionAnswerValidator from '../helpers/question-answer-validator';

interface NewAnswerRequestObj {
  text: string;
  isCorrect: boolean;
  gameId: string;
  questionId: string | null;
}

interface NewQuestionRequestObj {
  text: string;
  gameId: string;
  answers: Array<NewAnswerRequestObj>;
}

const questionService = QuestionService.getInstance();

export const createQuestions = async (req: Request, res: Response) => {
  const { error } = NewQuestionSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Invalid input' });

  const questions: Array<NewQuestionRequestObj> = req.body.questions;

  let answersValid = true;
  questions.forEach((question: NewQuestionRequestObj) => {
    const valid = QuestionAnswerValidator(question.answers);
    if (!valid) answersValid = false;
  });

  if (!answersValid) return res.status(400).json({ message: 'Provided answers are not correct' });

  questions.forEach(async (question: NewQuestionRequestObj) => {
    questionService.createQuestion({ gameId: question.gameId, text: question.text, numAnswers: 0 }, question.answers);
  });

  return res.status(200).json({ message: 'Success' });
};

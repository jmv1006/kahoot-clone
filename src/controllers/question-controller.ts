import { Request, Response } from 'express';
import QuestionService from '../services/question-service';
import { NewQuestionSchema, UpdateQuestionsSchema } from '../config/joi-schemas/question-answer';
import QuestionAnswerValidator from '../helpers/question-answer-validator';
import { UpdatedQuestion } from '../config/interfaces/updated-question-answer';

interface NewAnswerRequestObj {
  text: string;
  isCorrect: boolean;
  game_id: string;
}

interface NewQuestionRequestObj {
  text: string;
  game_id: string;
  answers: Array<NewAnswerRequestObj>;
}

interface UpdatedQuestionsRequestObj {
  game_id: string;
  questions: Array<UpdatedQuestion>;
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
    questionService.createQuestion({ game_id: question.game_id, text: question.text }, question.answers);
  });

  return res.status(200).json({ message: 'Success' });
};

export const getGameQuestions = async (req: Request, res: Response) => {
  const questionsAndAnswers = await questionService.getGameQuestions(req.params.game_id);

  return res.status(200).json({ questions: questionsAndAnswers });
};

export const updateQuestions = async (req: Request, res: Response) => {
  const { error } = UpdateQuestionsSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Invalid input update' });

  const body: UpdatedQuestionsRequestObj = req.body;

  body.questions.forEach((question: UpdatedQuestion) => questionService.updateQuestion(question));

  return res.send('Updated question');
};

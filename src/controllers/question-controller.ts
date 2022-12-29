import { Request, Response } from 'express';
import QuestionService from '../services/question-service';
import { NewQuestionSchema, UpdateQuestionsSchema } from '../config/joi-schemas/question-answer';
import QuestionAnswerValidator from '../helpers/question-answer-validator';
import { UpdatedQuestion, UpdatedAnswer } from '../config/interfaces/updated-question-answer';
import handleUpdatedAnswers from '../helpers/handle-updated-answers';

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

  if (!answersValid) return res.status(400).json({ message: 'There must be at least one correct answer and no duplicates.' });

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

  body.questions.forEach(async (question: UpdatedQuestion) => {
    if(question.id == null) {
      //If the question does not have an id, it is a new one
      const valid = QuestionAnswerValidator(question.answers.map((answer : UpdatedAnswer) => {return {isCorrect: answer.isCorrect, text: answer.text, game_id: answer.game_id}}));
      if (!valid) return res.status(400).json({ message: 'There must be at least one correct answer and no duplicates.' });
      questionService.createQuestion({ game_id: question.game_id, text: question.text }, question.answers);
    } else {
      //question exists
      const valid = await handleUpdatedAnswers(question.answers.map((answer: UpdatedAnswer) => {return  {isCorrect: answer.isCorrect, text: answer.text, game_id: answer.game_id, id: answer.id}}), question.id);
      if(!valid) return res.status(400).json({ message: 'There must be at least one correct answer and no duplicates.' });
      await questionService.updateQuestion(question);
    }
  });
  res.status(200).json({"message" : "Successfully updated question(s)."})
};

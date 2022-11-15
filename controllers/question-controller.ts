import { Request, Response } from 'express';
import client from '../config/prisma';
import QuestionService from '../services/question-service';

interface AnswerRequestObj {
   text: string;
   isCorrect: boolean;
   gameId: string;
   questionId: string | null;
}

interface QuestionRequestObj {
   text: string;
   gameId: string;
   answers: Array<AnswerRequestObj>;
}

const questionService = QuestionService.getInstance();

export const getGameQuestions = async (req: Request, res: Response) => {
   const gameId: string = req.params.gameId;

   const gameExists = await client.games.findUnique({ where: { id: gameId } });
   if (!gameExists)
      return res
         .status(400)
         .json({ message: 'Game with provided id does not exist' });
};

export const createQuestions = async (req: Request, res: Response) => {
   const gameId = req.params.gameId;

   const gameExists = await client.games.findUnique({ where: { id: gameId } });
   if (!gameExists)
      return res
         .status(400)
         .json({ message: 'Game with provided id does not exist' });

   const questions: Array<QuestionRequestObj> = req.body.questions;

   questions.forEach((question: QuestionRequestObj) => {
      questionService.createQuestion(
         { gameId: question.gameId, text: question.text, numAnswers: 0 },
         question.answers
      );
   });

   //questionService.createQuestion({gameId:"sadsaddsa", text: "dsadas", numAnswers: 0}, [{text: "1", isCorrect: true, gameId: req.params.gameId, questionId: null}])
};

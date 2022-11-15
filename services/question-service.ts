import { v4 as uuidv4 } from 'uuid';
import Question from '../config/interfaces/question';
import Answer from '../config/interfaces/answer';
interface QuestionInput {
   gameId: string;
   text: string;
   numAnswers: number;
}

interface AnswerInput {
   text: string;
   isCorrect: boolean;
   gameId: string;
   questionId: string | null;
}

class QuestionService {
   private static instance: QuestionService;

   public static getInstance(): QuestionService {
      if (!this.instance) {
         QuestionService.instance = new QuestionService();
      }
      return this.instance;
   }

   getQuestion(id: string) {
      const question = id; // check if question exists in db
      const answers: Array<any> = []; // get answers where answer.id === question.id

      return { question, answers };
   }

   async createQuestion(input: QuestionInput, answers: Array<AnswerInput>) {
      const newQuestion: Question = {
         id: uuidv4(),
         gameId: input.gameId,
         text: input.text,
         numAnswers: input.numAnswers,
      };

      const newAnswers = await this.createAnswers(answers, newQuestion.id);
      newQuestion.numAnswers = newAnswers.length;
      return newQuestion;
   }

   private async createAnswers(
      answers: Array<AnswerInput>,
      questionId: string
   ): Promise<Array<Answer>> {
      const res: Array<Answer> = [];

      answers.forEach((answer: AnswerInput) => {
         const newAnswer: Answer = {
            id: uuidv4(),
            questionId: questionId,
            gameId: answer.gameId,
            isCorrect: answer.isCorrect,
            text: answer.text,
         };

         //insert newAnswer into db
         res.push(newAnswer);
      });

      return res;
   }
}

export default QuestionService;

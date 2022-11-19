import { v4 as uuidv4 } from 'uuid';
import Question from '../config/interfaces/question';
import Answer from '../config/interfaces/answer';
import client from '../config/prisma';
interface QuestionInput {
  gameId: string;
  text: string;
  numAnswers: number;
}

interface AnswerInput {
  text: string;
  isCorrect: boolean;
  gameId: string;
}

interface QuestionModule {
  question: Question;
  answers: Array<Answer>;
}

class QuestionService {
  private static instance: QuestionService;

  public static getInstance(): QuestionService {
    if (!this.instance) {
      QuestionService.instance = new QuestionService();
    }
    return this.instance;
  }

  async createQuestion(input: QuestionInput, answers: Array<AnswerInput>) {
    const newQuestion: Question = {
      id: uuidv4(),
      game_id: input.gameId,
      text: input.text,
      num_answers: input.numAnswers,
    };

    const answerCount = await this.createAnswers(answers, newQuestion.id);
    newQuestion['num_answers'] = answerCount;
    await client.questions.create({ data: newQuestion });

    return newQuestion;
  }

  private async createAnswers(answers: Array<AnswerInput>, questionId: string): Promise<number> {
    answers.forEach(async (answer: AnswerInput) => {
      const newAnswer: Answer = {
        id: uuidv4(),
        question_id: questionId,
        game_id: answer.gameId,
        isCorrect: answer.isCorrect,
        text: answer.text,
      };
      await client.answers.create({ data: newAnswer });
    });

    const answerCount = await client.answers.count({ where: { question_id: questionId } });
    return answerCount;
  }

  async getGameQuestions(gameId: string) {
    const questions = await client.questions.findMany({ where: { game_id: gameId } });
    const answers = await client.answers.findMany({ where: { game_id: gameId } });

    const res: Array<QuestionModule> = [];

    questions.forEach(async (question: Question) => {
      const answersToQuestion = answers.filter((answer: Answer) => answer.question_id == question.id);
      res.push({ question, answers: answersToQuestion });
    });

    return res;
  }
}

export default QuestionService;

import { v4 as uuidv4 } from 'uuid';
import Question from '../config/interfaces/question';
import Answer from '../config/interfaces/answer';
import client from '../config/prisma';
import { UpdatedAnswer, UpdatedQuestion } from '../config/interfaces/updated-question-answer';

interface QuestionInput {
  game_id: string;
  text: string;
}

interface AnswerInput {
  text: string;
  isCorrect: boolean;
  game_id: string;
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
      game_id: input.game_id,
      text: input.text,
      num_answers: answers.length,
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
        game_id: answer.game_id,
        isCorrect: answer.isCorrect,
        text: answer.text,
      };
      await client.answers.create({ data: newAnswer });
    });

    const answerCount = await client.answers.count({ where: { question_id: questionId } });
    return answerCount;
  }

  async getGameQuestions(game_id: string) {
    const questions = await client.questions.findMany({ where: { game_id: game_id } });
    const answers = await client.answers.findMany({ where: { game_id: game_id } });

    console.log(questions)

    const res: Array<QuestionModule> = [];

    questions.forEach(async (question: Question) => {
      const answersToQuestion = answers.filter((answer: Answer) => answer.question_id == question.id);
      res.push({ question, answers: answersToQuestion });
    });

    return res;
  }

  async updateQuestion(question: UpdatedQuestion) {
    // check if question is new or being updated
    if(question.id == null) {
      console.log("question is brand new. must check for n")
    }
    else {
      console.log("question is being updated");

      question.answers.forEach((answer: UpdatedAnswer) => {
        console.log(answer)
      })
    }
    return 0
  }
}

export default QuestionService;

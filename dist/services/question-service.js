"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("../config/prisma"));
class QuestionService {
    static getInstance() {
        if (!this.instance) {
            QuestionService.instance = new QuestionService();
        }
        return this.instance;
    }
    createQuestion(input, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuestion = {
                id: (0, uuid_1.v4)(),
                game_id: input.game_id,
                text: input.text,
                num_answers: answers.length,
            };
            const answerCount = yield this.createAnswers(answers, newQuestion.id);
            newQuestion['num_answers'] = answerCount;
            yield prisma_1.default.questions.create({ data: newQuestion });
            return newQuestion;
        });
    }
    createAnswers(answers, questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            answers.forEach((answer) => __awaiter(this, void 0, void 0, function* () {
                const newAnswer = {
                    id: (0, uuid_1.v4)(),
                    question_id: questionId,
                    game_id: answer.game_id,
                    isCorrect: answer.isCorrect,
                    text: answer.text,
                };
                yield prisma_1.default.answers.create({ data: newAnswer });
            }));
            const answerCount = yield prisma_1.default.answers.count({ where: { question_id: questionId } });
            return answerCount;
        });
    }
    getGameQuestions(game_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = yield prisma_1.default.questions.findMany({ where: { game_id: game_id } });
            const answers = yield prisma_1.default.answers.findMany({ where: { game_id: game_id } });
            console.log(questions);
            const res = [];
            questions.forEach((question) => __awaiter(this, void 0, void 0, function* () {
                const answersToQuestion = answers.filter((answer) => answer.question_id == question.id);
                res.push({ question, answers: answersToQuestion });
            }));
            return res;
        });
    }
    updateQuestion(question) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if question is new or being updated
            if (question.id == null) {
                console.log("question is brand new. must check for n");
            }
            else {
                console.log("question is being updated");
                question.answers.forEach((answer) => {
                    console.log(answer);
                });
            }
            return 0;
        });
    }
}
exports.default = QuestionService;

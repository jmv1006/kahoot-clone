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
            yield prisma_1.default.questions.create({ data: newQuestion });
            yield this.createAnswers(answers, newQuestion.id);
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
        });
    }
    getGameQuestions(game_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = yield prisma_1.default.questions.findMany({ where: { game_id: game_id } });
            const answers = yield prisma_1.default.answers.findMany({ where: { game_id: game_id } });
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
            if (question.id != null) {
                // check if question text needs to be updated
                const originalText = yield prisma_1.default.questions.findUnique({ where: { id: question.id } });
                if ((originalText === null || originalText === void 0 ? void 0 : originalText.text) != question.text) {
                    yield prisma_1.default.questions.update({ where: { id: question.id }, data: { text: question.text } });
                }
                question.answers.forEach((answer) => __awaiter(this, void 0, void 0, function* () {
                    if (answer.id == null && question.id != null) {
                        // new answer
                        yield prisma_1.default.answers.create({ data: { id: (0, uuid_1.v4)(), question_id: question.id, game_id: question.game_id, isCorrect: answer.isCorrect, text: answer.text } });
                    }
                    else {
                        // update existing answer
                        if (answer.id != null) {
                            const existingAnswer = yield prisma_1.default.answers.findUnique({ where: { id: answer.id } });
                            if (answer.text != (existingAnswer === null || existingAnswer === void 0 ? void 0 : existingAnswer.text) || answer.isCorrect != existingAnswer.isCorrect)
                                yield prisma_1.default.answers.update({ where: { id: answer.id }, data: { text: answer.text, isCorrect: answer.isCorrect } });
                        }
                    }
                }));
                const newAnswerCount = yield prisma_1.default.answers.count({ where: { question_id: question.id } });
                yield prisma_1.default.questions.update({ where: { id: question.id }, data: { num_answers: newAnswerCount } });
            }
        });
    }
}
exports.default = QuestionService;

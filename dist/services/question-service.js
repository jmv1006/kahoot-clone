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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class QuestionService {
    static getInstance() {
        if (!this.instance) {
            QuestionService.instance = new QuestionService();
        }
        return this.instance;
    }
    getQuestion(id) {
        const question = id; // check if question exists in db
        const answers = []; // get answers where answer.id === question.id
        return { question, answers };
    }
    createQuestion(input, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuestion = {
                id: (0, uuid_1.v4)(),
                gameId: input.gameId,
                text: input.text,
                numAnswers: input.numAnswers
            };
            const newAnswers = yield this.createAnswers(answers, newQuestion.id);
            newQuestion.numAnswers = newAnswers.length;
            return newQuestion;
        });
    }
    createAnswers(answers, questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = [];
            answers.forEach((answer) => {
                const newAnswer = {
                    id: (0, uuid_1.v4)(),
                    questionId: questionId,
                    gameId: answer.gameId,
                    isCorrect: answer.isCorrect,
                    text: answer.text
                };
                //insert newAnswer into db
                res.push(newAnswer);
            });
            return res;
        });
    }
}
exports.default = QuestionService;

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
const prisma_1 = __importDefault(require("../config/prisma"));
const question_answer_validator_1 = __importDefault(require("./question-answer-validator"));
const handleUpdatedAnswers = (answersToBeUpdatedOrAdded, existingQuestionId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAnswers = yield prisma_1.default.answers.findMany({ where: { question_id: existingQuestionId } });
    const res = [];
    res.concat(existingAnswers);
    answersToBeUpdatedOrAdded.forEach((updatedAnswer) => {
        // if replacing an existing answer
        if (res.some((answer) => answer.id == updatedAnswer.id)) {
            res.forEach((existingAnswer) => {
                const index = res.findIndex((answerToBeSwapped) => answerToBeSwapped.id == existingAnswer.id);
                if (index >= 0)
                    res[index] = updatedAnswer;
            });
        }
        else {
            //answer is new
            res.push(updatedAnswer);
        }
    });
    return (0, question_answer_validator_1.default)(res.map((answerObject) => { return { game_id: answerObject.game_id, isCorrect: answerObject.isCorrect, text: answerObject.text }; }));
});
exports.default = handleUpdatedAnswers;

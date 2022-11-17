"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const NewQuestionSchema = joi_1.default.object({
    gameId: joi_1.default.string().required(),
    questions: joi_1.default.array().items({
        text: joi_1.default.string().min(3).max(255).required(),
        gameId: joi_1.default.string().required(),
        answers: joi_1.default.array().items({
            text: joi_1.default.string().min(1).max(255).required(),
            isCorrect: joi_1.default.boolean().required(),
            gameId: joi_1.default.string().required(),
        }),
    }),
});
exports.default = NewQuestionSchema;

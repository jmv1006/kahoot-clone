"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestionsSchema = exports.NewQuestionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const NewQuestionSchema = joi_1.default.object({
    game_id: joi_1.default.string().required(),
    questions: joi_1.default.array().items({
        text: joi_1.default.string().min(3).max(255).required(),
        game_id: joi_1.default.string().required(),
        answers: joi_1.default.array().items({
            text: joi_1.default.string().min(1).max(255).required(),
            isCorrect: joi_1.default.boolean().required(),
            game_id: joi_1.default.string().required(),
        }),
    }),
});
exports.NewQuestionSchema = NewQuestionSchema;
const UpdateQuestionsSchema = joi_1.default.object({
    game_id: joi_1.default.string().required(),
    questions: joi_1.default.array().items({
        id: joi_1.default.string().allow(null),
        text: joi_1.default.string().min(3).max(255).required(),
        game_id: joi_1.default.string().required(),
        answers: joi_1.default.array().items({
            id: joi_1.default.string().allow(null),
            text: joi_1.default.string().min(1).max(255).required(),
            question_id: joi_1.default.string().min(1).max(255),
            isCorrect: joi_1.default.boolean().required(),
            game_id: joi_1.default.string().required(),
        }),
    }),
});
exports.UpdateQuestionsSchema = UpdateQuestionsSchema;

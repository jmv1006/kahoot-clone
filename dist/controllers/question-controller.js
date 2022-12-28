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
exports.updateQuestions = exports.getGameQuestions = exports.createQuestions = void 0;
const question_service_1 = __importDefault(require("../services/question-service"));
const question_answer_1 = require("../config/joi-schemas/question-answer");
const question_answer_validator_1 = __importDefault(require("../helpers/question-answer-validator"));
const questionService = question_service_1.default.getInstance();
const createQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = question_answer_1.NewQuestionSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: 'Invalid input' });
    const questions = req.body.questions;
    let answersValid = true;
    questions.forEach((question) => {
        const valid = (0, question_answer_validator_1.default)(question.answers);
        if (!valid)
            answersValid = false;
    });
    if (!answersValid)
        return res.status(400).json({ message: 'Provided answers are not correct' });
    questions.forEach((question) => __awaiter(void 0, void 0, void 0, function* () {
        questionService.createQuestion({ game_id: question.game_id, text: question.text }, question.answers);
    }));
    return res.status(200).json({ message: 'Success' });
});
exports.createQuestions = createQuestions;
const getGameQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionsAndAnswers = yield questionService.getGameQuestions(req.params.game_id);
    return res.status(200).json({ questions: questionsAndAnswers });
});
exports.getGameQuestions = getGameQuestions;
const updateQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = question_answer_1.UpdateQuestionsSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: 'Invalid input update' });
    const body = req.body;
    body.questions.forEach((question) => questionService.updateQuestion(question));
    return res.send('Updated question');
});
exports.updateQuestions = updateQuestions;

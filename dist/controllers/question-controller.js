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
exports.createQuestion = exports.getGameQuestions = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const question_service_1 = __importDefault(require("../services/question-service"));
const questionService = question_service_1.default.getInstance();
const getGameQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.gameId;
    const gameExists = yield prisma_1.default.games.findUnique({ where: { id: gameId } });
    if (!gameExists)
        return res.status(400).json({ message: "Game with provided id does not exist" });
});
exports.getGameQuestions = getGameQuestions;
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.gameId;
    const gameExists = yield prisma_1.default.games.findUnique({ where: { id: gameId } });
    if (!gameExists)
        return res.status(400).json({ message: "Game with provided id does not exist" });
    const questions = req.body.questions;
    questions.forEach((question) => {
        questionService.createQuestion({ gameId: question.gameId, text: question.text, numAnswers: 0 }, question.answers);
    });
    //questionService.createQuestion({gameId:"sadsaddsa", text: "dsadas", numAnswers: 0}, [{text: "1", isCorrect: true, gameId: req.params.gameId, questionId: null}])
});
exports.createQuestion = createQuestion;

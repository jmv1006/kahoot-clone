"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const game_controller_1 = require("../controllers/game-controller");
const question_controller_1 = require("../controllers/question-controller");
const gameExists_1 = __importDefault(require("../middleware/gameExists"));
router.get('/', game_controller_1.getAll);
router.post('/', game_controller_1.createGame);
router.get('/:game_id/questions', gameExists_1.default, question_controller_1.getGameQuestions);
router.post('/:game_id/questions', gameExists_1.default, question_controller_1.createQuestions);
router.put('/:game_id/questions', gameExists_1.default, question_controller_1.updateQuestions);
exports.default = router;

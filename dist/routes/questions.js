"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const question_controller_1 = require("../controllers/question-controller");
router.post('/:gameId', question_controller_1.createQuestions);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuestionAnswerValidator = (answers) => {
    let isCorrect = false;
    answers.forEach((answer) => {
        if (isCorrect && answer.isCorrect)
            return false;
        if (isCorrect)
            isCorrect = true;
    });
    if (!isCorrect)
        return false;
    return true;
};
exports.default = QuestionAnswerValidator;

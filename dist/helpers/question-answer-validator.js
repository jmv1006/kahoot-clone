"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuestionAnswerValidator = (answers) => {
    let isCorrect = false;
    const answerTexts = new Set();
    answers.forEach((answer) => {
        if (isCorrect && answer.isCorrect)
            return false;
        if (!isCorrect)
            isCorrect = true;
        //duplicate answers
        if (answerTexts.has(answer.text.toUpperCase()))
            return false;
        answerTexts.add(answer.text.toUpperCase());
    });
    if (!isCorrect)
        return false;
    return true;
};
exports.default = QuestionAnswerValidator;

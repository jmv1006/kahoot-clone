"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// checks to see if given answer set has at least one true answer
const QuestionAnswerValidator = (answers) => {
    let isCorrect = false;
    const answerTexts = new Set();
    answers.forEach((answer) => {
        if (answer.isCorrect)
            isCorrect = true;
        if (answerTexts.has(answer.text.toUpperCase()))
            return false;
        answerTexts.add(answer.text.toUpperCase());
    });
    if (!isCorrect)
        return false;
    return true;
};
exports.default = QuestionAnswerValidator;

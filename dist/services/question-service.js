"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuestionService {
    static getInstance() {
        if (!this.instance) {
            QuestionService.instance = new QuestionService();
        }
        return this.instance;
    }
    getQuestion(id) {
        const question = id; // check if question exists in db
        const answers = []; // get answers where answer.id === question.id
        return { question, answers };
    }
}
exports.default = QuestionService;

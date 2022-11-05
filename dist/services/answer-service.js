"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AnswerService {
    static getInstance() {
        if (!this.instance) {
            AnswerService.instance = new AnswerService();
        }
        return this.instance;
    }
    createAnswer(answer) {
        const questionExists = true; //check if question exists in db
    }
}
exports.default = AnswerService;

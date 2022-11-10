"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameService {
    constructor() {
        this.games = [];
    }
    static getInstance() {
        if (!this.instance) {
            GameService.instance = new GameService();
        }
        return this.instance;
    }
}
exports.default = GameService;

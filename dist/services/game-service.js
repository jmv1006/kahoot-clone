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
    createGame(game) {
        this.games.push(game);
    }
}
exports.default = GameService;

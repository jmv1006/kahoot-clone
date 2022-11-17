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
const prisma_1 = __importDefault(require("../config/prisma"));
const uuid_1 = require("uuid");
class GameService {
    static getInstance() {
        if (!this.instance) {
            GameService.instance = new GameService();
        }
        return this.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const allGames = yield prisma_1.default.games.findMany();
            return allGames;
        });
    }
    getOne(game_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield prisma_1.default.games.findUnique({ where: { id: game_id } });
            return game;
        });
    }
    create(creatorId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            // numQuestions, creatorId, title
            const newGame = {
                id: (0, uuid_1.v4)(),
                numQuestions: 0,
                creatorId: creatorId,
                title: title,
            };
            yield prisma_1.default.games.create({ data: { id: newGame.id, numQuestions: 0, creatorId: newGame.creatorId, title: newGame.title } });
            return newGame;
        });
    }
}
exports.default = GameService;

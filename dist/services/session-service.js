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
const redis_config_1 = require("../config/redis/redis.config");
const redisClient = (0, redis_config_1.getClient)();
class SessionService {
    constructor(io) {
        this.serverObject = io;
    }
    createSession(creatorId, gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield prisma_1.default.users.findUnique({ where: { id: creatorId } });
            const gameExists = yield prisma_1.default.games.findUnique({ where: { id: gameId } });
            if (!userExists || !gameExists)
                return { successful: true, sessionId: null, gameInfo: null };
            // create a session
            const newSessionId = (0, uuid_1.v4)();
            const identifier = {
                sessionId: newSessionId,
                currentQuestion: 0,
                gameInfo: {
                    numQuestions: gameExists.numQuestions,
                    id: gameExists.id,
                    title: gameExists.title
                }
            };
            // here is where i would save the session somewhere
            return { successful: true, identifier };
        });
    }
}
exports.default = SessionService;

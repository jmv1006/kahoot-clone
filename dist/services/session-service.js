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
class SessionService {
    constructor(socket) {
        this.joinSession = (sessionId) => __awaiter(this, void 0, void 0, function* () {
            if (sessionId == "fake") {
                //successful
                const gameInfo = { id: "1234", numQuestions: 5 };
                const responseObj = { "successful": true, identifier: { sessionId: "id_by_server", currentQuestion: 0, gameInfo: gameInfo } };
                this.socket.emit('gameIdentifier', responseObj);
            }
            else {
                const invalidResponseObj = { "successful": false, identifier: { sessionId: null, currentQuestion: 0, gameInfo: null } };
                this.socket.emit('gameIdentifier', invalidResponseObj);
            }
        });
        this.createSession = ({ creatorId, gameId }) => __awaiter(this, void 0, void 0, function* () {
            // verify that game creator id is valid
            const userExists = yield prisma_1.default.users.findUnique({ where: { id: creatorId } });
            const gameExists = yield prisma_1.default.games.findUnique({ where: { id: gameId } });
            if (!userExists || !gameExists)
                return this.socket.emit('session-creation-response', { successful: false, id: null });
            // create a session
            const newSessionId = (0, uuid_1.v4)();
            this.socket.emit('session-creation-response', { successful: true, sessionId: newSessionId, gameInfo: { gameId, numQuestions: gameExists.numQuestions, title: gameExists.title } });
        });
        this.socket = socket;
    }
}
exports.default = SessionService;

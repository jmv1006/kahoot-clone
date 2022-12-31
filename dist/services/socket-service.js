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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_config_1 = require("../config/redis/redis.config");
const redisClient = (0, redis_config_1.getClient)();
const SocketService = (socket, sessionService) => {
    const initialize = () => {
        socket.emit("initializationConfirmation", "success");
    };
    const socketJoinSession = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
        const exists = yield redisClient.get(sessionId);
        if (!exists)
            return socket.emit('session-join-response', { sucessful: false, identifier: null });
        const identifierObj = JSON.parse(exists);
        return socket.emit('session-join-response', { successful: true, identifier: identifierObj });
    });
    const createSession = ({ creatorId, gameId }) => __awaiter(void 0, void 0, void 0, function* () {
        const createdSession = yield sessionService.createSession(creatorId, gameId);
        socket.emit('session-creation-response', createdSession);
    });
    socket.on('initialize', initialize);
    socket.on('join-session', socketJoinSession);
    socket.on('create-session', createSession);
    socket.on('disconnect', () => console.log('a user disconnected'));
};
exports.default = SocketService;

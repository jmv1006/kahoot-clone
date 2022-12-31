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
const SocketService = (socket, sessionService) => {
    const initialize = () => {
        socket.emit("initializationConfirmation", "success");
    };
    const socketJoinSession = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
        // check active sessions and see if the provided sessionId aligns with an active session
        if (sessionId == "fake") {
            //successful
            const gameInfo = { id: "1234", numQuestions: 5, title: "fake" };
            const responseObj = { "successful": true, identifier: { sessionId: "id_by_server", currentQuestion: 0, gameInfo: gameInfo } };
            socket.emit('gameIdentifier', responseObj);
        }
        else {
            const invalidResponseObj = { "successful": false, identifier: { sessionId: null, currentQuestion: 0, gameInfo: null } };
            socket.emit('gameIdentifier', invalidResponseObj);
        }
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

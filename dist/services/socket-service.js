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
const session_service_1 = __importDefault(require("./session-service"));
const SocketService = (socket) => {
    const sessionService = new session_service_1.default();
    const initialize = (user_id) => {
        socket.emit("initializationConfirmation", "success");
    };
    const joinGame = ({ user_id, sessionId }) => __awaiter(void 0, void 0, void 0, function* () {
        if (sessionId == "fake") {
            //successful
            const gameInfo = { id: "1234", numQuestions: 5 };
            const responseObj = { "successful": true, identifier: { sessionId: "id_by_server", currentQuestion: 0, gameInfo: gameInfo } };
            socket.emit('gameIdentifier', responseObj);
        }
        else {
            const invalidResponseObj = { "successful": false, identifier: { sessionId: null, currentQuestion: 0, gameInfo: null } };
            socket.emit('gameIdentifier', invalidResponseObj);
        }
    });
    socket.on('initialize', initialize);
    socket.on('join-game', joinGame);
    socket.on('disconnect', () => console.log('a user disconnected'));
};
exports.default = SocketService;

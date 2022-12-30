"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_service_1 = __importDefault(require("./session-service"));
const SocketService = (socket) => {
    const sessionService = new session_service_1.default(socket);
    const initialize = () => {
        socket.emit("initializationConfirmation", "success");
    };
    socket.on('initialize', initialize);
    socket.on('join-session', sessionService.joinSession);
    socket.on('create-session', sessionService.createSession);
    socket.on('disconnect', () => console.log('a user disconnected'));
};
exports.default = SocketService;

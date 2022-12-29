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
const SocketService = (socket) => {
    const initialize = (user_id) => {
        console.log(user_id);
        socket.emit("initializationConfirmation", "success");
    };
    const joinGame = ({ user_id, game_id }) => __awaiter(void 0, void 0, void 0, function* () {
        if (game_id == "fake") {
            const responseObj = { "successful": true, identifier: { game_id: "fake_to_be_created", currentQuestion: 0, num_questions: 5 } };
            socket.emit('gameIdentifier', responseObj);
        }
        else {
            socket.emit('gameIdentifier', { "successful": false });
        }
    });
    socket.on('initialize', initialize);
    socket.on('join-game', joinGame);
    socket.on('disconnect', () => console.log('a user disconnected'));
};
exports.default = SocketService;

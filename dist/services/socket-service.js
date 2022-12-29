"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketService = (socket) => {
    const handleEvent = () => {
        console.log('event recieved');
    };
    const initialize = (username) => {
        console.log(username);
        socket.emit("initializationConfirmation", "success");
    };
    socket.on('event', handleEvent);
    socket.on('initialize', initialize);
    socket.on('disconnect', () => console.log('a user disconnected'));
};
exports.default = SocketService;

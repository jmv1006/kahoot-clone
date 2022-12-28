"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketService = (socket) => {
    const handleEvent = () => {
        console.log('event recieved');
    };
    socket.on('event', handleEvent);
    socket.on('disconnect', () => console.log('a user disconnected'));
};
exports.default = SocketService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketService = (io, socket) => {
    const handleEvent = () => {
        console.log('event recieved');
    };
    socket.on('event', handleEvent);
};
exports.default = SocketService;

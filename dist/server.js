"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_service_1 = __importDefault(require("./services/socket-service"));
const session_service_1 = __importDefault(require("./services/session-service"));
const redis_config_1 = require("./config/redis/redis.config");
(0, redis_config_1.connectToRedis)();
const httpServer = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: '*' },
});
const sessionService = new session_service_1.default(io);
io.on('connection', (socket) => {
    //this happens for each individual user
    console.log('A user connected to the server');
    (0, socket_service_1.default)(socket, sessionService);
});
const PORT = process.env.PORT || 7000;
httpServer.listen(PORT);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const game_1 = __importDefault(require("./routes/game"));
const user_1 = __importDefault(require("./routes/user"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const allowedOrigins = ['*', 'http://localhost:3000'];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/games', game_1.default);
app.use('/users', user_1.default);
exports.default = app;

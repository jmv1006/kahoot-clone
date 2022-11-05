"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_service_1 = __importDefault(require("./services/game-service"));
const app = (0, express_1.default)();
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
const service = game_service_1.default.getInstance();
const service2 = game_service_1.default.getInstance();
console.log(service == service2);
const port = 4000;
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

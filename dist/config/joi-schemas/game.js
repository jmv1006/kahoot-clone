"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const newGameSchema = joi_1.default.object({
    creatorId: joi_1.default.string().required(),
    title: joi_1.default.string().min(3).max(64).required(),
});
exports.default = newGameSchema;

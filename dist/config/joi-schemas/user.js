"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const newUserSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(36).required(),
    email: joi_1.default.string().min(3).max(64).email().required(),
    password: joi_1.default.string().min(8).max(64).required(),
    confirmedPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required(),
});
exports.default = newUserSchema;

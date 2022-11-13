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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
class UserService {
    static getInstance() {
        if (!this.instance) {
            UserService.instance = new UserService();
        }
        return this.instance;
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.users.findUnique({ where: { id: id } });
            return user;
        });
    }
    create(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, bcryptjs_1.genSalt)(10, (err, salt) => {
                (0, bcryptjs_1.hash)(userInfo.password, salt, (err, hash) => {
                    const createdUser = {
                        id: (0, uuid_1.v4)(),
                        username: userInfo.username,
                        email: userInfo.email,
                        password: hash,
                    };
                    //insert hash into db
                    return createdUser;
                });
            });
        });
    }
}
exports.default = UserService;

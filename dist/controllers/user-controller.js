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
exports.create = exports.getSpecific = void 0;
const builder_1 = require("../config/joi-schemas/builder");
const user_service_1 = __importDefault(require("../services/user-service"));
const user_1 = __importDefault(require("../config/joi-schemas/user"));
const prisma_1 = __importDefault(require("../config/prisma"));
const userService = user_service_1.default.getInstance();
const getSpecific = (req, res) => {
    const schema = (0, builder_1.schemaBuilder)([{ name: 'user_id', required: true, min: 2, max: 255 }]);
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).json({ message: 'Invalid input' });
    const user = userService.get(req.body.user_id);
    if (!user)
        return res.status(400).json({ message: 'User does not exist' });
    return res.status(200).json({ user: user });
};
exports.getSpecific = getSpecific;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = user_1.default.validate(req.body);
    if (error)
        return res.status(400).json({
            message: 'Error creating new user. Ensure all requirements are met.',
        });
    const userExists = yield prisma_1.default.users.findFirst({
        where: { email: req.body.email },
    });
    if (userExists)
        return res.status(400).json({ message: 'user with provided email already exists' });
    const newUser = userService.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    if (!newUser)
        return res.status(500).json({ message: 'Server Error. Could not create new user.' });
    return res.status(200).json({ user: newUser });
});
exports.create = create;

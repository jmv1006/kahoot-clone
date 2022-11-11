"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getSpecific = void 0;
const builder_1 = require("../config/joi-schemas/builder");
const user_service_1 = __importDefault(require("../services/user-service"));
const user_1 = __importDefault(require("../config/joi-schemas/user"));
const userService = user_service_1.default.getInstance();
const getSpecific = (req, res) => {
    const schema = (0, builder_1.schemaBuilder)([
        { name: "user_id", required: true, min: 2, max: 255 },
    ]);
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).json({ message: "Invalid input" });
    const user = userService.get(req.body.user_id);
    if (!user)
        return res.status(400).json({ message: "User does not exist" });
    return res.status(200).json({ user: user });
};
exports.getSpecific = getSpecific;
const create = (req, res) => {
    const { error } = user_1.default.validate(req.body);
    if (error)
        return res
            .status(400)
            .json({
            message: "Error creating new user. Ensure all requirements are met.",
        });
    const newUser = userService.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    if (!newUser)
        return res
            .status(500)
            .json({ message: "Server Error. Could not create new user." });
    return res.status(200).json({ user: newUser });
};
exports.create = create;

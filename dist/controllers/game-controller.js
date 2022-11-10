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
exports.getAll = exports.create = void 0;
const game_service_1 = __importDefault(require("../services/game-service"));
const game_1 = __importDefault(require("../config/joi-schemas/game"));
const gameService = game_service_1.default.getInstance();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = game_1.default.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Error with input" });
    }
    /*
    const creatorExists = client.users.findUnique({where: {id: req.body.creatorId}});
  
    if (!creatorExists) {
      return res.status(401).json({message: "Could not find registered user with given id"})
    }
    */
    const created = yield gameService.create(req.body.creatorId, req.body.title);
    res.status(200).json({ data: { game: created } });
});
exports.create = create;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield gameService.getAll();
    res.json({ data: games });
});
exports.getAll = getAll;

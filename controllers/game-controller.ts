import { Request, Response } from "express";
import GameService from "../services/game-service";

const gameService: GameService = GameService.getInstance();

export const create = async (req: Request, res: Response) => {
  res.send(gameService.games);
};

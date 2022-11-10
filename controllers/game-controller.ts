import { Request, Response } from "express";
import Game from "../config/interfaces/game";
import GameService from "../services/game-service";

const gameService: GameService = GameService.getInstance();

export const create = async (req: Request, res: Response) => {
  const created: Game = gameService.create();
  res.status(200).json({ data: { game: created } });
};

export const getAll = async (req: Request, res: Response) => {
  const games = await gameService.getAll();
  res.json({ data: games });
};

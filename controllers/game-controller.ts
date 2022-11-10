import { Request, Response } from "express";
import Game from "../config/interfaces/game";
import GameService from "../services/game-service";
import newGameSchema from "../config/joi-schemas/game";
import client from "../config/prisma";

const gameService: GameService = GameService.getInstance();

export const create = async (req: Request, res: Response) => {
  const { error } = newGameSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Error with input" });
  }

  /*
  const creatorExists = client.users.findUnique({where: {id: req.body.creatorId}});

  if (!creatorExists) {
    return res.status(401).json({message: "Could not find registered user with given id"})
  }
  */
  
  const created: Game = await gameService.create(
    req.body.creatorId,
    req.body.title
  );
  res.status(200).json({ data: { game: created } });
};

export const getAll = async (req: Request, res: Response) => {
  const games = await gameService.getAll();
  res.json({ data: games });
};

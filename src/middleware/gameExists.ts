import { Request, Response, NextFunction } from 'express';
import client from '../config/prisma';

const checkGameExists = async (req: Request, res: Response, next: NextFunction) => {
  const game_id = req.params.game_id;
  const gameExists = await client.games.findUnique({ where: { id: game_id } });

  if (!gameExists) return res.status(400).json({ message: 'Game with provided id does not exist' });
  next();
};

export default checkGameExists;

import Game from "../config/interfaces/game";
import client from "../config/prisma";
import { v4 as uuidv4 } from "uuid";

class GameService {
  private static instance: GameService;

  public static getInstance(): GameService {
    if (!this.instance) {
      GameService.instance = new GameService();
    }
    return this.instance;
  }

  async getAll() {
    const allGames = await client.games.findMany();
    return allGames;
  }

  async getOne(game_id: string) {
    const game = await client.games.findUnique({ where: { id: game_id } });
    return game;
  }

  async create(creatorId: string, title: string) {
    // numQuestions, creatorId, title
    const newGame: Game = {
      id: uuidv4(),
      numQuestions: 0,
      creatorId: creatorId,
      title: title,
    };

    return newGame;
  }
}

export default GameService;

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

  create() {
    // numQuestions, creatorId, title
    const newGame: Game = {
      id: uuidv4(),
      numQuestions: 1,
      creatorId: "das",
      title: "Fake title",
    };

    return newGame;
  }
}

export default GameService;

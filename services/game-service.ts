import Game from "../config/interfaces/game";

class GameService {
  private static instance: GameService;
  games: Array<Game>;

  private constructor() {
    this.games = [];
  }

  public static getInstance(): GameService {
    if (!this.instance) {
      GameService.instance = new GameService();
    }
    return this.instance;
  }
}

export default GameService;

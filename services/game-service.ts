interface Game {
    id: string,
    numQuestions: string | number,
    creatorId: string,
    title: string
}

class GameService {
    private static instance: GameService;
    games: Array<Game>;

    private constructor() {
        this.games = []
    }

    public static getInstance(): GameService {
        if (!this.instance) {
            GameService.instance = new GameService();
        }
        return this.instance;
    }

    createGame(game: Game) { 
        this.games.push(game)
    }

}

export default GameService
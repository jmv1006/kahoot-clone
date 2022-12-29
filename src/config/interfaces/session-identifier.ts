import gameIdentifier from "./game-identifier";

interface sessionIdentifier {
    sessionId: string,
    currentQuestion: number,
    gameInfo: gameIdentifier | null
}

export default sessionIdentifier


import gameIdentifier from "./game-identifier";

interface SessionIdentifier {
    sessionId: string,
    currentQuestion: number,
    gameInfo: gameIdentifier | null
}

export default SessionIdentifier


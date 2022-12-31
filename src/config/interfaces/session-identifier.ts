import gameIdentifier from "./game-identifier";

interface SessionIdentifier {
    sessionId: string,
    currentQuestion: number,
    creatorId: string,
    gameInfo: gameIdentifier | null
}

export default SessionIdentifier


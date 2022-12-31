import client from "../config/prisma";
import { v4 as uuidv4 } from 'uuid';
import { Server } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '../config/interfaces/socketio';
import { getClient } from "../config/redis/redis.config";
import SessionIdentifier from "../config/interfaces/session-identifier";

const redisClient = getClient();

class SessionService {
    serverObject : Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

    constructor(io : Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) {
        this.serverObject = io;
    }

    async createSession(creatorId : string, gameId : string) {
        const userExists = await client.users.findUnique({where: {id: creatorId}});
        const gameExists = await client.games.findUnique({where: {id: gameId}});
        if(!userExists || !gameExists)  return {successful : true, sessionId: null, gameInfo: null};

        // create a session
        const newSessionId = uuidv4();

        const identifier : SessionIdentifier = {
            sessionId: newSessionId,
            currentQuestion: 0,
            gameInfo: {
                numQuestions: gameExists.numQuestions,
                id: gameExists.id,
                title: gameExists.title
            }
        }
        // here is where i would save the session somewhere

        return {successful : true, identifier};
    }

}

export default SessionService;
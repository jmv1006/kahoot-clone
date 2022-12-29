import { Socket } from "socket.io";
import gameIdentifier from "../config/interfaces/game-identifier";

interface joinIdentifier {
    user_id : string,
    sessionId: string
}
  

class SessionService {
    private static instance: SessionService;
    socket : Socket;

    public static getInstance(socket: Socket): SessionService {
      if (!this.instance) {
        SessionService.instance = new SessionService(socket);
      }
      return this.instance;
    }

    constructor(socket : Socket) {
        this.socket = socket;
    }

    joinGame = async ({user_id, sessionId} : joinIdentifier) => {
        if(sessionId == "fake") {
          //successful
          const gameInfo : gameIdentifier = {id: "1234", numQuestions: 5};
          const responseObj = {"successful" : true, identifier: {sessionId: "id_by_server", currentQuestion: 0, gameInfo: gameInfo}};
          this.socket.emit('gameIdentifier', responseObj);
        } else {
          const invalidResponseObj = {"successful" : false, identifier: {sessionId: null, currentQuestion: 0, gameInfo: null}};
          this.socket.emit('gameIdentifier', invalidResponseObj);
        }
      }
}

export default SessionService;
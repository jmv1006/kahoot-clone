import { Socket } from 'socket.io';
import gameIdentifier from '../config/interfaces/game-identifier';
import SessionService from './session-service';

interface SessionCreationObj {
  creatorId: string,
  gameId: string
}

const SocketService = (socket: Socket, sessionService : SessionService) => {

  const initialize = () => {
    socket.emit("initializationConfirmation", "success")
  }

  const socketJoinSession = async (sessionId: string) => {
    if(sessionId == "fake") {
      //successful
      const gameInfo : gameIdentifier = {id: "1234", numQuestions: 5};
      const responseObj = {"successful" : true, identifier: {sessionId: "id_by_server", currentQuestion: 0, gameInfo: gameInfo}};
      socket.emit('gameIdentifier', responseObj);
    } else {
      const invalidResponseObj = {"successful" : false, identifier: {sessionId: null, currentQuestion: 0, gameInfo: null}};
      socket.emit('gameIdentifier', invalidResponseObj);
    }
};

  const createSession = async ({creatorId, gameId} : SessionCreationObj) => {
      const createdSession = await sessionService.createSession(creatorId, gameId);
      socket.emit('session-creation-response', createdSession);
  }

  socket.on('initialize', initialize);
  socket.on('join-session', socketJoinSession);
  socket.on('create-session', createSession);
  socket.on('disconnect', () => console.log('a user disconnected'));
};

export default SocketService;
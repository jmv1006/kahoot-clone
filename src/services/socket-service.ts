import { Socket } from 'socket.io';
import SessionIdentifier from '../config/interfaces/session-identifier';
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
    const fakeIdentifier : SessionIdentifier = {
      sessionId: '1234',
      currentQuestion: 0,
      gameInfo: {
        title: "Fake game",
        id: "12223",
        numQuestions: 0
      }
    };
    
    return 0
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
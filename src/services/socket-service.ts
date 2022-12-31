import { Socket } from 'socket.io';
import SessionIdentifier from '../config/interfaces/session-identifier';
import { getClient } from '../config/redis/redis.config';
import SessionService from './session-service';

interface SessionCreationObj {
  creatorId: string,
  gameId: string
}

const redisClient = getClient();

const SocketService = (socket: Socket, sessionService : SessionService) => {

  const initialize = () => {
    socket.emit("initializationConfirmation", "success")
  }

  const socketJoinSession = async (sessionId: string) => {
    const exists = await redisClient.get(sessionId);
    if(!exists) return socket.emit('session-join-response', {sucessful : false, identifier: null})

    const identifierObj : SessionIdentifier = JSON.parse(exists)
    
    socket.join(sessionId);
    return socket.emit('session-join-response', {successful : true, identifier: identifierObj})
  };

  const createSession = async ({creatorId, gameId} : SessionCreationObj) => {
    const createdSession = await sessionService.createSession(creatorId, gameId);
    socket.emit('session-creation-response', createdSession);
  }

  const updateSessionInfo = async (sessionId : string) => {
    const sessionInCache = await redisClient.get(sessionId);
    if(!sessionInCache) return socket.emit('update-session-response', {successful: false, updatedIdentifier: null});

    const session : SessionIdentifier = JSON.parse(sessionInCache);
    session.currentQuestion += 1;
    
    await redisClient.setEx(sessionId, 600, JSON.stringify(session));
    socket.emit('update-session-response', {successful: true, session});

    sessionService.sendUpdatedSessionInfo(sessionId, session);
  }

  socket.on('initialize', initialize);
  socket.on('join-session', socketJoinSession);
  socket.on('create-session', createSession);
  socket.on('update-session', updateSessionInfo)
  socket.on('disconnect', () => console.log('a user disconnected'));
};

export default SocketService;
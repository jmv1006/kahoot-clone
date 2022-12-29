import { Socket } from 'socket.io';
import SessionService from './session-service';

const SocketService = (socket: Socket) => {
  const sessionService = SessionService.getInstance(socket);

  const initialize = (user_id : string) => {
    socket.emit("initializationConfirmation", "success")
  }

  socket.on('initialize', initialize)
  socket.on('join-game', sessionService.joinGame)
  socket.on('disconnect', () => console.log('a user disconnected'));
};

export default SocketService;

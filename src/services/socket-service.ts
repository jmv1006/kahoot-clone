import { Socket } from 'socket.io';

const SocketService = (socket: Socket) => {
  const handleEvent = () => {
    console.log('event recieved');
  };

  const initialize = (username : string) => {
    console.log(username)
    socket.emit("initializationConfirmation", "success")
  }

  socket.on('event', handleEvent);
  socket.on('initialize', initialize)
  socket.on('disconnect', () => console.log('a user disconnected'));
};

export default SocketService;

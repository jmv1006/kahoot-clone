import { Socket } from 'socket.io';

const SocketService = (socket: Socket) => {
  const handleEvent = () => {
    console.log('event recieved');
  };

  socket.on('event', handleEvent);
  socket.on('disconnect', () => console.log('a user disconnected'));
};

export default SocketService;

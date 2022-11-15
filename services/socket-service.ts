import { Socket } from 'socket.io';

const SocketService = (io: any, socket: Socket) => {
  const handleEvent = () => {
    console.log('event recieved');
  };

  socket.on('event', handleEvent);
};

export default SocketService;

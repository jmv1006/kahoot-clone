import app from './app';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import SocketService from './services/socket-service';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected to the server');
  SocketService(io, socket);
});

const PORT = process.env.PORT || 7000;
httpServer.listen(PORT);

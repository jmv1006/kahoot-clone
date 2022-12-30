import app from './app';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import SocketService from './services/socket-service';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './config/interfaces/socketio';
import SessionService from './services/session-service';

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
  cors: { origin: '*' },
});

const sessionService = new SessionService(io);

io.on('connection', (socket: Socket) => {
  //this happens for each individual user
  console.log('A user connected to the server');
  SocketService(socket, sessionService);
});

const PORT = process.env.PORT || 7000;
httpServer.listen(PORT);

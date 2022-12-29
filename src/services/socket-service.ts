import { Socket } from 'socket.io';

interface joinIdentifier {
  user_id : string,
  game_id: string
}

const SocketService = (socket: Socket) => {

  const initialize = (user_id : string) => {
    console.log(user_id)
    socket.emit("initializationConfirmation", "success")
  }

  const joinGame = async ({user_id, game_id} : joinIdentifier) => {
    if(game_id == "fake") {
      const responseObj = {"successful" : true, identifier: {game_id: "fake_to_be_created", currentQuestion: 0, num_questions: 5}};
      socket.emit('gameIdentifier', responseObj);
    } else {
      socket.emit('gameIdentifier', {"successful" : false});
    }
  }

  socket.on('initialize', initialize)
  socket.on('join-game', joinGame)
  socket.on('disconnect', () => console.log('a user disconnected'));
};

export default SocketService;

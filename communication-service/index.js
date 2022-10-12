import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World from communication-service');
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('send-chat', (roomId, senderUsername, chatMessage) => {
    if (roomId !== '') {
      /*
        When one client send a chat message, every other client(s) 
        with the same roomId will receive the chat.
      */
      socket.to(roomId).emit('receive-chat', senderUsername, chatMessage);
    }
  });
});

httpServer.listen(8080, () =>
  console.log('communication-service listening on port 8080')
);

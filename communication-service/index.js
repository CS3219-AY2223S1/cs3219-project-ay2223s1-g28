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
    origin: ['http://localhost:3000']
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

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

  // leave-session: when user clicks on "leave session" button
  // disconnecting: when user closes tab/disconnects
  const sessionEndEvents = ["leave-session", "disconnecting"];
  
  for (const event of sessionEndEvents) {
    socket.on("leave-session", () => {
      socket.rooms.forEach(room => {
        if (room !== socket.id) {
          // Emit to other sockets in the same room this socket had joined
          socket.to(room).emit('session-end', 'Your peer had left the session.', 'warning');
          io.socketsLeave(room);
        } else {
          // Emit back to the socket itself
          socket.emit('session-end', 'You had left the session.', 'info');
        }
      });
    });
  }

});

httpServer.listen(8002, () =>
  console.log('communication-service listening on port 8002')
);

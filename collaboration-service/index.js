import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import {
  ormGetCode as _getCode,
  ormSetCode as _setCode,
} from './model/collaboration-orm.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.ENV === 'PROD'
        ? process.env.FRONTEND_URL
        : 'http://localhost:3000',
    credentials: true,
  })
);

// Socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.ENV === 'PROD'
        ? process.env.FRONTEND_URL
        : 'http://localhost:3000',
    credentials: true,
  },
  path: '/api/collab-service/socket',
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', async (roomId) => {
    socket.join(roomId);

    // load existing code if users refresh page
    const existingCode = await _getCode(roomId);
    socket.emit('update-code', existingCode);
  });

  socket.on('code-changed', async (roomId, code) => {
    socket.to(roomId).emit('update-code', code);
    _setCode(roomId, code);
  });

  // leave-session: when user clicks on "leave session" button
  // disconnecting: when user closes tab/disconnects
  // Note: "disconnecting" used insted of "disconnect" because in this event,
  //        socket.rooms are not empty.
  const sessionEndEvents = ['leave-session', 'disconnecting'];

  for (const event of sessionEndEvents) {
    socket.on(event, () => {
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          if (
            event === sessionEndEvents[0] ||
            // If the room is less than 2 people,
            // we can assume that the user had closed the tab.
            // Otherwise, the user just refreshed the page
            !io.sockets.adapter.rooms.get(room) ||
            io.sockets.adapter.rooms.get(room).size < 2
          ) {
            // Emit to other sockets in the same room this socket had joined
            socket
              .to(room)
              .emit(
                'session-end',
                'Your peer has left the session.',
                'warning'
              );
            io.socketsLeave(room);
          }
        } else {
          // Emit back to the socket itself
          socket.emit('session-end', 'You have left the session.', 'info');
        }
      });
    });
  }

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected due to ' + reason);
  });
});

// Routes
app.get('/', (_, res) => res.send('Hello World from collaboration-service'));

const PORT = 8003;
httpServer.listen(PORT, () => {
  console.log(`collab-service listening on port ${PORT}`);
});

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
	handleJoinRoom,
	handleChat,
	readChats,
} from './controller/comm-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());
app.get('/', (req, res) => {
	res.send('Hello World from communication service');
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: ['http://localhost:3000'],
	},
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

	handleJoinRoom(socket);
	handleChat(io, socket);

  // leave-session: when user clicks on "leave session" button
  // disconnecting: when user closes tab/disconnects
  // Note: "disconnecting" used insted of "disconnect" because in this event,
  //        socket.rooms are not empty.
  const sessionEndEvents = ['leave-session', 'disconnecting'];

  for (const event of sessionEndEvents) {
    socket.on(event, () => {
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          // Emit to other sockets in the same room this socket had joined
          socket
            .to(room)
            .emit('session-end', 'Your peer had left the session.', 'warning');
          io.socketsLeave(room);
        } else {
          // Emit back to the socket itself
          socket.emit('session-end', 'You had left the session.', 'info');
        }
      });
    });
  }
});

const router = express.Router();
// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from comm-service'));
router.get('/read', readChats);

app.use('/api/chat', router).all((_, res) => {
	res.setHeader('content-type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

httpServer.listen(8002, () =>
	console.log('communication-service listening on port 8002')
);

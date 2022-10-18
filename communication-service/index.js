import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handleJoinRoom, handleChat, createChat } from './controller/comm-controller.js';

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
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  handleJoinRoom(socket);
  handleChat(socket);
});

const router = express.Router();
// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from comm-service'));
router.post('/create', createChat);

app.use('/api/chat', router).all((_, res) => {
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

httpServer.listen(8002, () =>
  console.log('communication-service listening on port 8002')
);

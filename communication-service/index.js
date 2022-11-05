import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
	handleJoinRoom,
	handleChat,
	readChats,
	handleSessionEnd,
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
	path: '/api/communication-service/socket',
});

io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`);

	handleJoinRoom(socket);
	handleChat(io, socket);
	handleSessionEnd(io, socket);
});

const router = express.Router();
// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from comm-service'));
router.get('/read', readChats);

httpServer.listen(8002, () =>
	console.log('communication-service listening on port 8002')
);

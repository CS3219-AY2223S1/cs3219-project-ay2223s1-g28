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
app.use(
  cors({
    origin: process.env.ENV === 'PROD'? process.env.FRONTEND_URL : 'http://localhost:3000'
  })
); // config cors so that front-end can use
app.options('*', cors());
app.get('/', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', process.env.ENV === 'PROD'? process.env.FRONTEND_URL : 'http://localhost:3000');
	res.send('Hello World from communication service');
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: process.env.ENV === 'PROD'? process.env.FRONTEND_URL : 'http://localhost:3000',
	},
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

app.use('/api/chat', router).all((_, res) => {
	res.setHeader('content-type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', process.env.ENV === 'PROD'? process.env.FRONTEND_URL : 'http://localhost:3000');
});

httpServer.listen(8002, () =>
	console.log('communication-service listening on port 8002')
);

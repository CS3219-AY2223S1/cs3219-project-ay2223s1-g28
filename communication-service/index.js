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
app.use(cors({
	origin: process.env.ENV === 'PROD'? process.env.FRONTEND_URL : 'http://localhost:3000',
	credentials: true,
}));

// Socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: process.env.ENV === 'PROD'? process.env.FRONTEND_URL : 'http://localhost:3000',
		credentials: true,
	},
	path: '/api/comm-service/socket',
});

io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`);

	handleJoinRoom(socket);
	handleChat(io, socket);
	handleSessionEnd(io, socket);

	socket.on('disconnect', (reason) => {
        console.log('Client disconnected due to ' + reason);
    });
});

// Routes
const router = express.Router();

router.get('/', (_, res) => res.send('Hello World from communication-service'));
router.get('/read', readChats);

app.use('/api/chat', router).all((_, res) => {
	res.setHeader('content-type', 'application/json');
});

const PORT = 8002;
httpServer.listen(PORT, () => {
	console.log(`comm-service listening on port ${PORT}`);
});

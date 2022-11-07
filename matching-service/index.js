import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handleMatch, handleCancelMatch, handleDisconnect } from './controller/matching-controller.js';

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
  path: '/api/matching-service/socket',
});
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  handleMatch(socket);
  handleCancelMatch(socket);
  handleDisconnect(socket);
});

// Routes
app.get('/', (_, res) => res.send('Hello World from matching-service'));

const PORT = 8001;
httpServer.listen(PORT, () => {
  console.log(`matching-service listening on port ${PORT}`);
});

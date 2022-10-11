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
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
});

httpServer.listen(8080, () =>
  console.log('communication-service listening on port 8080')
);

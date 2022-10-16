import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('code-changed', (roomId, code) => {
    socket.to(roomId).emit('update-code', code);
  });
});

app.get('/', (req, res) => {
  res.send('Hello World from collaboration-service');
});

const PORT = 8003;
httpServer.listen(PORT, () => console.log(`collaboration-service listening on port ${PORT}`));

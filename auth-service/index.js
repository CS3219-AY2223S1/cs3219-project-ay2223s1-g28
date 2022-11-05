import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { signin, signout, authenticate } from './controller/auth-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
); // config cors so that front-end can use
app.options('*', cors());
app.use(cookieParser());

app.get('/', (_, res) => res.send('Hello World from auth-service'));
app.post('/signin', signin); // public endpoint
app.get('/signout', signout); // public endpoint
app.get('/verify-jwt', authenticate); // public endpoint
app.get('/auth', authenticate); // NGINX endpoint

const PORT = 8005;
app.listen(PORT, () => console.log(`auth-service listening on port ${PORT}`));

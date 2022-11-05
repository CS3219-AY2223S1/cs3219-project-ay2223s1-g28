import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
  createUser,
  updateAccount,
  deleteAccount,
  logout,
  signin,
  acknowledgeJWTValidity,
  authenticateJwt,

} from './controller/user-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.ENV === 'PROD'? process.env.FRONTEND_URL : 'http://localhost:3000',
    credentials: true,
  })
); // config cors so that front-end can use
app.options('*', cors());
app.use(cookieParser());

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'));
router.post('/signup', createUser);
router.post('/signin', signin);
router.post('/logout', authenticateJwt, logout);
router.post('/update', authenticateJwt, updateAccount);
router.post('/delete', authenticateJwt, deleteAccount);
router.get('/verify-jwt', authenticateJwt, acknowledgeJWTValidity);

app.listen(8000, () => console.log('user-service listening on port 8000'));

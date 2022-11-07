import express from 'express';
import cors from 'cors';
import { createUser, updateUser, deleteUser } from './controller/user-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: process.env.ENV == 'PROD'? process.env.FRONTEND_URL : 'http://localhost:3000',
  credentials: true,
}));
app.options('*', cors());

// Routes
const router = express.Router();

router.get('/', (_, res) => res.send('Hello World from user-service'));
router.post('/signup', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

app.use('/api/user', router).all((_, res) => {
  res.setHeader('content-type', 'application/json');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`user-service listening on port ${PORT}`);
});

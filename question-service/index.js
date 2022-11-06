import express from "express";
import cors from "cors";
import {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  getQuestionByDifficulty,
  deleteQuestionById,
} from "./controller/question-controller.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.ENV === 'PROD'? process.env.FRONTEND_URL : 'http://localhost:3000',
    credentials: true,
  })
); // config cors so that front-end can use
app.options("*", cors());

const router = express.Router();

// Don't have to authenticate again since this will be a protected route
router.get("/", getAllQuestions);
router.post("/", createQuestion);
router.get("/:id", getQuestionById);
router.delete("/:id", deleteQuestionById);
router.get("/level/:difficulty/:questionNumber", getQuestionByDifficulty);

app.listen(8004, () => console.log("question-service listening on port 8004"));

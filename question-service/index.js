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
app.use(cors({
  origin: process.env.ENV === 'PROD'? process.env.FRONTEND_URL : 'http://localhost:3000',
  credentials: true,
}));
app.options("*", cors());

const router = express.Router();

router.get("/", getAllQuestions);
router.post("/", createQuestion);
router.get("/:id", getQuestionById);
router.delete("/:id", deleteQuestionById);
router.get("/level/:difficulty/:questionNumber", getQuestionByDifficulty);

app.use("/api/question", router).all((_, res) => {
  res.setHeader("content-type", "application/json");
});

const PORT = 8004;
app.listen(PORT, () => {
  console.log(`question-service listening on port ${PORT}`);
});

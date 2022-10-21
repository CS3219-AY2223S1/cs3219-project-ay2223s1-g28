import {
  ormGetAllQuestions as _getAllQuestions,
  ormCreateQuestion as _createQuestion,
  ormGetQuestionById as _getQuestionById,
  ormGetQuestionByDifficulty as _getQuestionByDifficulty,
  ormDeleteQuestionById as _deleteQuestionById,
} from "../model/question-orm.js";

export async function getAllQuestions(req, res) {
  try {
    // resp contains the question obtained from db
    const resp = await _getAllQuestions();

    // Error faced when getting all questions
    if (resp.err) {
      console.log(resp.err);
      return res.status(400).json({ message: "Could not get all questions" });
    } else {
      console.log("SUCCESS: all questions obtained");
      return res
        .status(200)
        .json(resp);
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Database failure when getting all questions" });
  }
}

export async function createQuestion(req, res) {
  try {
    // Request body will contain these fields
    const { title, difficulty, categories, content } = req.body;

    // Check if all of these fields exists in the JSON document
    if (title && difficulty && categories && content) {
      const resp = await _createQuestion(title, difficulty, categories, content);

      // Error faced when creating question
      if (resp.err) {
        console.log(resp.err);
        return res
          .status(400)
          .json({ message: "Could not create a new question!" });
      } else {
        console.log("SUCCESS: new question created!");
        return res
          .status(201)
          .json("Successfully created question!");
      }
    } else {
      return res.status(400).json(resp);
    }
  } catch (err) {
    return res
      .status(500)
      .json(err);
  }
}

export async function getQuestionById(req, res) {
  try {
    const _id = req.params.id;
    if (_id) {
      // resp contains the question obtained from db
      const resp = await _getQuestionById(_id);

      // Error faced when getting question
      if (resp.err) {
        console.log(resp.err);
        return res
          .status(400)
          .json({ message: "Could not get question by id!" });
      } else {
        console.log("SUCCESS: question obtained by id!");
        return res
          .status(200)
          .json(resp);
      }
    } else {
      return res
        .status(400)
        .json({ message: "One of these question fields (id) is missing!" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Database failure when getting question by id!" });
  }
}

export async function getQuestionByDifficulty(req, res) {
  try {
    const difficulty = req.params.difficulty;
    const questionNumber = req.params.questionNumber;
    if (difficulty && questionNumber) {
      // resp contains the question obtained from db
      const resp = await _getQuestionByDifficulty(difficulty, questionNumber);

      // Error faced when getting question
      if (resp.err) {
        console.log(resp.err);
        return res
          .status(400)
          .json({ message: "Could not get question by difficulty!" });
      } else {
        console.log("SUCCESS: question obtained by difficulty!");
        return res
          .status(200)
          .json(resp);
      }
    } else {
      return res
        .status(400)
        .json({
          message: "One of these question fields (difficulty) is missing!",
        });
    }
  } catch (err) {
    return res
      .status(400)
      .json({
        message: "Database failure when getting question by difficulty!",
      });
  }
}

export async function deleteQuestionById(req, res) {
  try {
    const _id = req.params.id;
    if (_id) {
      const resp = await _deleteQuestionById(_id);

      // Error faced when deleting this question
      if (resp.err) {
        console.log(resp.err);
        return res
          .status(400)
          .json({ message: "Could not delete question by id!" });
      } else {
        console.log("SUCCESS: question deleted by id!");
        return res
          .status(200)
          .json("Successfully deleted question!");
      }
    } else {
      return res
        .status(400)
        .json({ message: "One of these question fields (id) is missing!" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Database failure when deleting question by id!" });
  }
}

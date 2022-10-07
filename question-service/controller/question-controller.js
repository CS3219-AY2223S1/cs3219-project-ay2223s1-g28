import {
  ormCreateQuestion as _createQuestion,
  ormGetQuestionById as _getQuestionById,
  ormGetQuestionByDifficulty as _getQuestionByDifficulty,
  ormDeleteQuestionById as _deleteQuestionById,
} from "../model/question-orm";

export async function createQuestion(req, res) {
  try {
    // Request body will contain these fields
    const { _id, title, difficulty, content } = req.body;

    // Check if all of these fields exists in the JSON document
    if (_id && title && difficulty && content) {
      const resp = await _createQuestion(_id, title, difficulty, content);

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
          .json({ message: "Created new question successfully!" });
      }
    } else {
      return res
        .status(400)
        .json({
          message:
            "One of these question fields (_id, title, difficulty, content) is missing!",
        });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when creating new user!" });
  }
}

export async function getQuestionById(req, res) {
  try {
    const { _id } = req.body;
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
          .json({ message: "Question successfully obtained by id!" });
      }
    } else {
        return res
          .status(400)
          .json({ message: "One of these question fields (_id) is missing!" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Database failure when getting question by id!" });
  }
}

export async function getQuestionByDifficulty(req, res) {
  try {
    const { difficulty } = req.body;
    if (difficulty) {
      // resp contains the question obtained from db
      const resp = await _getQuestionByDifficulty(difficulty);

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
          .json({ message: "Question successfully obtained by difficulty!" });
      }
    } else {
        return res
          .status(400)
          .json({ message: "One of these question fields (difficulty) is missing!" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Database failure when getting question by difficulty!" });
  }
}

export async function deleteQuestionById(req, res) {
  try {
    const { _id } = req.body;
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
          .json({ message: "Question successfully deleted by id!" });
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



import 'dotenv/config';

import questionModel from "./question-model.js";

//Set up mongoose connection
import mongoose from 'mongoose';

const mongoDB = process.env.ENV == 'PROD'
  ? process.env.DB_CLOUD_URI
  : process.env.DB_LOCAL_URI || process.env.DB_DOCKER_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function getAllQuestions() {
  // Gets all documents in this collection
  return await questionModel.find({});
}

export async function createQuestion(question) {
    return new questionModel(question);
}

export async function getQuestionById(id) {
  return await questionModel.findOne({ _id: id });
}

export async function getQuestionByDifficulty(userDifficulty, questionNumber) {
  // questionNumber is the randomly generated integer used
  // so that a random question of a particular
  // difficulty can be obtained

  const numOfQns = await questionModel.find({ difficulty: userDifficulty }).count();
  var random = questionNumber % numOfQns;
  return await questionModel.findOne({ difficulty: userDifficulty }).skip(random);
}

export async function deleteQuestionById(id) {
    return await questionModel.deleteOne({ _id: id });
}


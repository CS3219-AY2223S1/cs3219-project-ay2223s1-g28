import 'dotenv/config';

import questionModel from "./question-model.js";

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function getAllQuestions() {
  // Gets all documents in this collection
  return await questionModel.find({});
}

export async function createQuestion(question) {
    return new questionModel(question);
}

export async function getQuestionById(id) {
  return await questionModel.findOne({ where: { id }});
}

export async function getQuestionByDifficulty(difficulty) {
  var random = Math.floor(Math.random());
  return await questionModel.findOne({ where: { difficulty }}).skip(random);
}

export async function deleteQuestionById(id) {
    return await questionModel.deleteOne({ id });
}

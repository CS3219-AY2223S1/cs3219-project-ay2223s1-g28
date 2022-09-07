import 'dotenv/config';

import UserModel from './user-model.js';

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) { 
  return new UserModel(params)
}

// Returns the queried user, or null if not found
export async function getUserByUsername(username) {
  return await UserModel.findOne({ username }).exec();
}

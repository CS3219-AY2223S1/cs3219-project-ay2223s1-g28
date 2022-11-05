import 'dotenv/config';
import mongoose from 'mongoose';

import UserModel from './user-model.js';

// MongoDb setup
const mongoDB = process.env.ENV == 'PROD' 
  ? process.env.DB_CLOUD_URI 
  : process.env.DB_LOCAL_URI || process.env.DB_DOCKER_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Returns created user
export const createUser = async (username, email, password) => { 
  const user = new UserModel({ username, email, password});
  await user.save();
};

// Returns queried user, or null if not found
export const getUserByUsername = async (username) => {
  return await UserModel.findOne({ username }).exec();
};

// Returns queried user, or null if not found
export const getUserByEmail = async (email) => {
  return await UserModel.findOne({ email }).exec();
};

// Returns updated user, or null if user does not exist
export const updateUser = async (username, newProfile) => {
  return await UserModel.findOneAndUpdate({ username }, newProfile, {
    new: true,
    returnDocument: "after" // return updated user object
  });
};

// Deletes user if exists
export const deleteUser = async (username) => {
  await UserModel.deleteOne({ username });
};

import 'dotenv/config';
import mongoose from 'mongoose';

import UserModel from './user-model.js';

// MongoDB setup
const mongoDB = process.env.ENV == 'PROD'
  ? process.env.DB_CLOUD_URI
  : process.env.DB_LOCAL_URI || process.env.DB_DOCKER_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Returns the queried user, or null if not found
export const getUserByUsername = async (username) => {
  return await UserModel.findOne({ username }).exec();
};

// Returns the queried user, or null if not found
export const getUserByEmail = async (email) => {
  return await UserModel.findOne({ email }).exec();
};

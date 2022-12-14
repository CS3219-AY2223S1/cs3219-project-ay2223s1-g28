import 'dotenv/config';

import ChatModel from './chat-model.js';

//Set up mongoose connection
import mongoose from 'mongoose';

const mongoDB = process.env.ENV == 'PROD'
	? process.env.DB_CLOUD_URI
	: process.env.DB_LOCAL_URI || process.env.DB_DOCKER_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createChat(params) {
	return new ChatModel(params);
}

export async function getChatsByRoomID(rid) {
	return await ChatModel.find({ rid }).exec();
}

export async function deleteChatsByRoomID(rid) {
	return await ChatModel.deleteMany({ rid }).exec();
}

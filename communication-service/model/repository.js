import 'dotenv/config';

import ChatModel from './chat-model.js';

//Set up mongoose connection
import mongoose from 'mongoose';

const mongoDB =
	process.env.ENV == 'PROD'
		? process.env.DB_CLOUD_URI
		: process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Returns the queried chat, or null if not found
export async function getChatByRoomIDAndIndex(rid, index) {
	return await ChatModel.findOne({ rid, index }).exec();
}

export async function createChat(params) {
	return new ChatModel(params);
}

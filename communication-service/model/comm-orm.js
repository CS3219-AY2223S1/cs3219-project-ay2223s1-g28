import { createChat, getChatsByRoomID } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateChat(roomId, sender, text) {
	try {
		const newChat = await createChat({
			rid: roomId,
			sender,
			text,
		});

		return await newChat.save();
	} catch (err) {
		console.log('ERROR: Could not create new chat');
		return { err };
	}
}

export async function ormGetChats(roomId) {
	const chats = await getChatsByRoomID(roomId);
	return chats;
}

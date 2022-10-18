import { createChat, getChatsByRoomID } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateChat(roomId, chatIndex, sender, receiver, text) {
	try {
		const newChat = await createChat({
			rid: roomId,
			index: chatIndex,
			sender,
			receiver,
			text,
		});
		newChat.save();
		return true;
	} catch (err) {
		console.log('ERROR: Could not create new chat');
		return { err };
	}
}

// Checks if chat exists in database
export async function ormGetChatLength(roomId) {
	const chats = await getChatsByRoomID(roomId);
	return chats.length;
}

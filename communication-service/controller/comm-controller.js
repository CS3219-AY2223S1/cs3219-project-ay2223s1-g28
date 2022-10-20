import {
	ormCreateChat as _createChat,
	ormGetChatLength as _getChatLength,
} from '../model/comm-orm.js';

export function handleJoinRoom(socket) {
	socket.on('join-room', (roomId) => {
		socket.join(roomId);
	});
}

export function handleChat(socket) {
	socket.on('send-chat', (roomId, senderUsername, chatMessage) => {
		if (roomId !== '') {
			/*
			  When one client send a chat message, every other client(s) 
			  with the same roomId will receive the chat.
		 	*/
			socket.to(roomId).emit('receive-chat', senderUsername, chatMessage);
		}
	});
}

export async function createChat(req, res) {
	try {
		const { roomId, sender, text } = req.body;
		if (roomId && sender && text) {
			const chatIndex = await _getChatLength(roomId);
			const resp = await _createChat(roomId, chatIndex, sender, text);

			if (resp.err) {
				return res
					.status(400)
					.json({ message: 'Could not create a new chat!' });
			}
		} else {
			const missingField = `${
				!roomId
					? 'Room ID is'
					: !sender
					? 'Sender username is'
					: !text
					? 'Chat message is'
					: 'Some chat fields are'
			}`;
			return res.status(400).json({ message: `${missingField} missing!` });
		}
	} catch (err) {
		return res.status(500).json({
			message: `Database failure when creating new chat!\nERR: ${err.message}`,
		});
	}
}

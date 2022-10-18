import {
	ormCreateChat as _createChat,
	isExistingChat,
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
		const { roomId, chatIndex, sender, receiver, text } = req.body;
		if (roomId && chatIndex >= 0 && sender && receiver && text) {
			if (await isExistingChat(roomId, chatIndex)) {
				/*
				  If one of the users modify the chat list in the frontend,
				  for example, deleting some of the chats with JavaScript.

				  This will cause the index of the next incoming message
				  clashes with the existing one in the database.

				  Then this error will be invoked the next time another
				  user sends message.

				  Refreshing page will load all the messages back and
				  restore the correct indices.
				*/
				return res
					.status(409)
					.json({
						message:
							'Failed to receive message, please refresh your page!',
					});
			}

			const resp = await _createChat(roomId, chatIndex, sender, receiver, text);

			if (resp.err) {
				return res
					.status(400)
					.json({ message: 'Could not create a new chat!' });
			}
		} else {
			const missingField = `${
				!roomId
					? 'Room ID is'
					: !chatIndex
					? 'Chat index is'
					: !sender
					? 'Sender username is'
					: !receiver
					? 'Receiver username is'
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

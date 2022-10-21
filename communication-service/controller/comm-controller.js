import {
	ormCreateChat as _createChat,
	ormGetChats as _getChats,
} from '../model/comm-orm.js';

export function handleJoinRoom(socket) {
	socket.on('join-room', (roomId) => {
		socket.join(roomId);
	});
}

async function createChat(roomId, sender, text) {
	try {
		if (roomId && sender && text) {
			const createResp = await _createChat(roomId, sender, text);

			if (createResp.err) {
				return {
					success: false,
					feedback: 'Failed to send message!',
				};
			}

			// If no error, "createResp" is the new chat sent with additional "_id" field.
			// This value of key "_id" will be used as key prop in chat list.
			return { success: true, chatSent: createResp, feedback: 'Message sent!' };
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

			return { success: false, feedback: `${missingField} missing!` };
		}
	} catch (err) {
		return {
			success: false,
			feedback: `Something when wrong!\nERR: ${err.message}`,
		};
	}
}

export function handleChat(io, socket) {
	socket.on('send-chat', async (roomId, senderUsername, chatMessage) => {
		if (roomId !== '') {
			/*
			  When one client send a chat message, every other client(s) 
			  with the same roomId will receive the chat.
		 	*/
			const resp = await createChat(roomId, senderUsername, chatMessage);
			const isSentSuccess = resp.success;
			const feedback = resp.feedback;
			const chatSent = resp.chatSent;
			io.in(roomId).emit(
				'receive-chat',
				isSentSuccess,
				feedback,
				senderUsername,
				chatSent
			);
		}
	});
}

export async function readChats(req, res) {
	try {
		const { roomId } = req.query;
		if (roomId) {
			const resp = await _getChats(roomId);

			if (resp.err) {
				return res.status(400).json({ message: 'Could not retrieve chats!' });
			}

			return res.status(200).json({ chats: resp });
		} else {
			return res
				.status(400)
				.json({ message: 'Room not found! Failed to retrieve chats.' });
		}
	} catch (err) {
		return res.status(500).json({
			message: `Database failure when creating new chat!\nERR: ${err.message}`,
		});
	}
}

import { ormCreateChat as _createChat } from '../model/comm-orm.js';

export async function createChat(req, res) {
	try {
		const { roomId, chatIndex, sender, receiver, text } = req.body;
		if (roomId && chatIndex >= 0 && sender && receiver && text) {
			const resp = await _createChat(roomId, chatIndex, sender, receiver, text);

			if (resp.err) {
				return res.status(400).json({ message: 'Could not create a new chat!' });
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

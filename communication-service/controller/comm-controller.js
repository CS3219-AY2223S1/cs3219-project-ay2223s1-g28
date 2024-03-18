import {
  ormCreateChat as _createChat,
  ormGetChats as _getChats,
  ormDeleteChats as _deleteChats,
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
      // When one client send a chat message, every other client(s)
      // with the same roomId will receive the chat.
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

export function handleSessionEnd(io, socket) {
  // leave-session: when user clicks on "leave session" button
  // disconnecting: when user closes tab/disconnects
  // Note: "disconnecting" used insted of "disconnect" because in this event,
  //        socket.rooms are not empty.
  const sessionEndEvents = ['leave-session', 'disconnecting'];

  for (const event of sessionEndEvents) {
    socket.on(event, () => {
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          if (
            event === sessionEndEvents[0] ||
            // If the room is less than 2 people,
            // we can assume that the user had closed the tab
            !io.sockets.adapter.rooms.get(room) ||
            io.sockets.adapter.rooms.get(room).size < 2
          ) {
            // Emit to other sockets in the same room this socket had joined
            socket
              .to(room)
              .emit(
                'session-end',
                'Your peer has left the session.',
                'warning'
              );
            io.socketsLeave(room);
          }
        } else {
          // Emit back to the socket itself
          socket.emit('session-end', 'You have left the session.', 'info');
        }
      });
    });
  }
}

import { useState, useEffect, useContext } from 'react';

import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import ChatList from './ChatList';
import Title from './Title';
import styles from './ChatBlock.module.css';

import useInput from '../../../hooks/use-input';

import UserContext from '../../../context/user-context';

import isValidChat from '../../../validators/chat-validator';

const ENTER_KEY_CODE = 13;

function ChatBlock({ socket, roomId }) {
  const userCtx = useContext(UserContext);
  const [chats, setChats] = useState([]);

  const {
    value: chatMessage,
    isValid: chatIsValid,
    valueChangeHandler: chatChangeHandler,
    reset: resetChat,
  } = useInput(isValidChat);

  useEffect(() => {
    // Using useeffect hook to avoid rendering duplicate copies of chat received
    // (Only render chat block component once after receive message)
    socket.on('receive-chat', (senderUsername, chatMessage) => {
      setChats((chats) => [...chats, { senderUsername, text: chatMessage }]);
    });

    // The listeners must be removed in the cleanup step,
    // in order to prevent multiple event registrations.
    return () => socket.off('receive-chat');
  }, [socket]);

  const sendChatHandler = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();

      if (!chatIsValid) {
        resetChat();
        return;
      }

      const senderUsername = userCtx.username;

      socket.emit('send-chat', roomId, senderUsername, chatMessage);

      setChats((chats) => [
        ...chats,
        { senderUsername: 'Me', text: chatMessage },
      ]);

      resetChat();
    }
    // If the key pressed is not ENTER key, do not proceed to send the message
  };

  return (
    <div className={styles.chat_block}>
      <Title />
      <Divider orientation="horizontal" />
      <ChatList chats={chats} />
      <TextField
        placeholder="Chat here..."
        className={styles.chat_input}
        value={chatMessage}
        onChange={chatChangeHandler}
        onKeyDown={sendChatHandler}
      ></TextField>
    </div>
  );
}

export default ChatBlock;

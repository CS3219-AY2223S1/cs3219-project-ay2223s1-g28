import { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

import ChatList from './ChatList';
import Title from './Title';
import styles from './ChatBlock.module.css';

import AlertContext from '../../../context/alert-context';
import UserContext from '../../../context/user-context';
import useInput from '../../../hooks/use-input';
import isValidChat from '../../../validators/chat-validator';

import { URL_COMM_SVC_CREATE_CHAT } from '../../../configs';

const ENTER_KEY_CODE = 13;

function ChatBlock({ socket, roomId }) {
	const alertCtx = useContext(AlertContext);
	const userCtx = useContext(UserContext);
	const [chats, setChats] = useState([]);

	const {
		value: chatMessage,
		isValid: chatIsValid,
		valueChangeHandler: chatChangeHandler,
		reset: resetChat,
	} = useInput(isValidChat);

	const myUsername = userCtx.username;

	useEffect(() => {
		// Using useeffect hook to avoid rendering duplicate copies of chat received
		// (Only render chat block component once after receive message)
		socket.on('receive-chat', (senderUsername, chatMessage) => {
			// Insert chat only after the recipient receive the message
			axios
				.post(URL_COMM_SVC_CREATE_CHAT, {
					roomId,
					sender: senderUsername,
					text: chatMessage,
				})
				.then(
					// Update user UI only after the chat is added to database
					setChats((chats) => [...chats, { senderUsername, text: chatMessage }])
				)
				.catch((err) => {
					alertCtx.onShow(err.response.data.message);
				});
		});

		// The listeners must be removed in the cleanup step,
		// in order to prevent multiple event registrations.
		return () => socket.off('receive-chat');
	}, [socket, roomId, alertCtx, myUsername, chats.length]);

	const sendChatHandler = () => {
		if (!chatIsValid) {
			resetChat();
			return;
		}

		socket.emit('send-chat', roomId, myUsername, chatMessage);

		setChats((chats) => [
			...chats,
			{ senderUsername: 'Me', text: chatMessage },
		]);

		resetChat();
	};

	const onKeyDownHandler = (event) => {
		// Send the message only if the user press ENTER
		if (event.keyCode === ENTER_KEY_CODE) {
			event.preventDefault();
			sendChatHandler();
		}
	};

	return (
		<div className={styles.chat_block}>
			<Title />
			<Divider orientation="horizontal" />
			<ChatList chats={chats} />
			<OutlinedInput
				placeholder="Chat here..."
				className={styles.chat_input}
				value={chatMessage}
				onChange={chatChangeHandler}
				onKeyDown={onKeyDownHandler}
				endAdornment={
					chatMessage && (
						<InputAdornment position="end">
							<IconButton onClick={sendChatHandler} edge="end">
								<SendIcon color="primary" />
							</IconButton>
						</InputAdornment>
					)
				}
			></OutlinedInput>
		</div>
	);
}

export default ChatBlock;

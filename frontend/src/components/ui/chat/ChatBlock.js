import { useState, useEffect, useContext, useCallback } from 'react';

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

import { URL_COMM_SVC_READ_CHAT } from '../../../configs';

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

	const processMyChat = useCallback(
		/*
		  Note: 
		  Since useEffect references to this function, useCallback is used here 
		  to prevent infinite loop by caching it. Any cached function will not
		  change (re-rendered) unless its dependencies change.

		  By using useCallback, it can improve performance too.
		*/
		(chat) => {
			return chat.sender === myUsername ? { ...chat, sender: 'Me' } : chat;
		},
		[myUsername]
	);

	// Retrieve the chats for this room, if any
	const getChats = useCallback(async () => {
		/*
		  Note: 
		  Since useEffect references to this function, useCallback is used here 
		  to prevent infinite loop by caching it. Any cached function will not
		  change (re-rendered) unless its dependencies change.

		  By using useCallback, it can improve performance too.
		*/
		const response = await axios
			.get(URL_COMM_SVC_READ_CHAT, {
				params: {
					roomId,
				},
				withCredentials: true,
			})
			.catch((err) => {
				alertCtx.onShow(err.response.data.message);
			});
		const chatsRetrieved = await response.data.chats.map((chat) =>
			processMyChat(chat)
		);
		setChats(chatsRetrieved);
	}, [alertCtx, roomId, processMyChat]);

	useEffect(() => {
		// Retrieve chats when user refreshes page
		getChats();

		// Using useEffect hook to avoid rendering duplicate copies of chat received
		// (Only render chat block component once after receive message successfully)
		socket.on('receive-chat', (isSentSuccess, feedback, sender, chatSent) => {
			isSentSuccess && setChats((chats) => [...chats, processMyChat(chatSent)]);
			// Inform sender message sending failed
			sender === myUsername &&
				alertCtx.onShow(feedback, isSentSuccess ? 'success' : 'error');
		});

		// The listeners must be removed in the cleanup step,
		// in order to prevent multiple event registrations.
		return () => socket.off('receive-chat');
	}, [
		socket,
		roomId,
		alertCtx,
		myUsername,
		chats.length,
		getChats,
		processMyChat,
	]);

	const sendChatHandler = () => {
		if (!chatIsValid) {
			resetChat();
			return;
		}

		socket.emit('send-chat', roomId, myUsername, chatMessage);

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

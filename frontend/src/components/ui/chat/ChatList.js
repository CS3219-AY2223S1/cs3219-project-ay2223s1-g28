import { useRef, useEffect, memo } from 'react';

import Chat from './Chat';
import styles from './ChatList.module.css';

const AlwaysScrollToBottom = () => {
	const messageEndRef = useRef();
	// false argument passed to scrollIntoView so that
	// the bottom of the element will be aligned to
	// the bottom of the visible area of the scrollable ancestor
	useEffect(() => messageEndRef.current.scrollIntoView(false), []);
	return <div ref={messageEndRef} />;
};

function ChatList({ chats }) {
	const lastChatMessage = chats[chats.length - 1];

	return (
		<ul className={styles.chat_list}>
			{/* For each chat object, create the HTML view of the msg id, sender id and the message */}
			{chats.map((chat) => {
				return (
					<li key={chat._id}>
						<Chat senderUsername={chat.sender} text={chat.text} />
					</li>
				);
			})}

			{/* 
        Dummy component used to scroll to the end of messages.
        Scroll to the bottom only if it is my message to avoid
        annoying scroll behavior every time receiving message 
        from another party.
      */}
			{lastChatMessage && lastChatMessage.sender === 'Me' && (
				<AlwaysScrollToBottom key={lastChatMessage._id} />
			)}
		</ul>
	);
}

// "memo" is used here to improve performance since the chat is potentially large.
// It should not re-render every time its parent (ChatBlock) re-renders.
export default memo(ChatList);

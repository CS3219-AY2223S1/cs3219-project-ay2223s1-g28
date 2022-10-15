import { useRef, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import Chat from './Chat';
import styles from './ChatList.module.css';

const AlwaysScrollToBottom = () => {
  const messageEndRef = useRef();
  /*
    false argument passed to scrollIntoView so that
    the bottom of the element will be aligned to 
    the bottom of the visible area of the scrollable ancestor
  */
  useEffect(() => messageEndRef.current.scrollIntoView(false));
  return <div ref={messageEndRef} />;
};

function ChatList({ chats }) {
  const lastChatMessage = chats[chats.length - 1];

  return (
    <ul className={styles.chat_list}>
      {/* For each chat object, create the HTML view of the msg id, sender id and the message */}
      {chats.map((chat) => {
        let uniqueChatKey = uuidv4();
        return (
          <li key={uniqueChatKey}>
            <Chat senderUsername={chat.senderUsername} text={chat.text} />
          </li>
        );
      })}

      {/* 
        Dummy component used to scroll to the end of messages.
        Scroll to the bottom only if it is my message to avoid
        annoying scroll behavior every time receiving message 
        from another party.
      */}
      {lastChatMessage && lastChatMessage.senderUsername === 'Me' && (
        <AlwaysScrollToBottom />
      )}
    </ul>
  );
}

export default ChatList;

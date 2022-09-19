import React from "react";

import Chat from "./Chat";
import style from "./ChatList.module.css";

function ChatList(props) {
  return (
    <ul className={style.chat_list}>
      {/*For each message objects, create the HTML view of the msg id, sender id and the message */}
      {props.chats.map((chat) => {
        return (
          <li key={chat.id}>
            <Chat text={chat.text} senderId={chat.senderId} />
          </li>
        );
      })}
    </ul>
  );
}

export default ChatList;
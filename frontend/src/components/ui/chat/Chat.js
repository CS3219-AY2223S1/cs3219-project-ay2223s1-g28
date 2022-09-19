import React from "react";

import style from "./Chat.module.css";

function Chat(props) {
  return (
    <div className={style.chat_container}>
      <div className={style.chat_sender}>
        <h4>{props.senderId}: </h4>
      </div>
      <div className={style.chat_text}>{props.text}</div>
    </div>
  );
}

export default Chat;

import React, { useState } from "react";

import style from "./ChatTextBox.module.css";

function ChatTextBox() {
  const [state] = useState({ message: "" });
  return (
    <div className={style.chattextbox}>
      <input
        value={state.message}
        placeholder="Type here..."
        type="text"
        className={style.chatinput}
      ></input>
    </div>
  );
}

export default ChatTextBox;

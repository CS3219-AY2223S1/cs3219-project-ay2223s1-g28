import { useState } from "react";

import styles from "./ChatTextBox.module.css";

function ChatTextBox() {
  const [state] = useState({ message: "" });
  return (
    <div className={styles.chat_textbox}>
      <input
        value={state.message}
        placeholder="Type here..."
        type="text"
        className={styles.chat_input}
      ></input>
    </div>
  );
}

export default ChatTextBox;

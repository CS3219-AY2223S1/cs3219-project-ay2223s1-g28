import { useState } from "react"

import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import ChatList from "./ChatList";
import Title from "./Title";
import style from "./ChatBlock.module.css";

const DUMMY_DATA = [
  {
    senderId: "perborgen",
    text: "who'll win!who'll win!who'll win!who'll win!who'll win!who'll win!who'll win!",
  },
  {
    senderId: "janedoe",
    text: "who'll win!",
  },
  {
    senderId: "jimyy",
    text: "who'll win!",
  },
];

function ChatBlock() {
  const[state, setState] = useState({ chats: DUMMY_DATA });
  return (
    <div className={style.chat_block}>
      <Title />
      <Divider orientation="Horizontal" />
      {/* sets a prop called messages in MessageList component */}
      <ChatList chats={state.chats} />
      <TextField
        placeholder="Chat here..."
        className={style.chat_input}
      ></TextField>
    </div>
  );
}

export default ChatBlock;
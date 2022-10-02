import Chat from "./Chat";
import styles from "./ChatList.module.css";

function ChatList(props) {
  return (
    <ul className={styles.chat_list}>
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
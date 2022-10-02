import styles from "./Chat.module.css";

function Chat(props) {
  return (
    <div className={styles.chat_container}>
      <div className={styles.chat_sender}>
        <h4>{props.senderId}: </h4>
      </div>
      <div className={styles.chat_text}>{props.text}</div>
    </div>
  );
}

export default Chat;

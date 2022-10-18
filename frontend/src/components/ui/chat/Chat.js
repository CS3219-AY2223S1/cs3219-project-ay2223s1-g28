import styles from './Chat.module.css';

function Chat({senderUsername, text}) {
  return (
    <div className={styles.chat_container}>
      <div className={styles.chat_sender}>
        <h4>{senderUsername}: </h4>
      </div>
      <div className={styles.chat_text}>{text}</div>
    </div>
  );
}

export default Chat;

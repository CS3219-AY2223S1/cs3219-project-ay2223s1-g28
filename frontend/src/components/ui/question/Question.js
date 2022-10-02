import styles from "./Question.module.css";

function Question(props) {
  return (
    <div>
      <p className={styles.question}>{props.question}</p>
    </div>
  );
}

export default Question;

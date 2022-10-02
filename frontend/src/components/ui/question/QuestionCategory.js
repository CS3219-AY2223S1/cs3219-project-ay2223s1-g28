import styles from "./QuestionCategory.module.css";

function QuestionCategory(props) {
  return (
    <div className={styles.category_bubble}>
      <p className={styles.category_text}>{props.text}</p>
    </div>
  );
}

export default QuestionCategory;

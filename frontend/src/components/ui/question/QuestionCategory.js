import styles from "./QuestionCategory.module.css";

function QuestionCategory({text}) {
  return (
    <div className={styles.category_bubble}>
      <p className={styles.category_text}>{text}</p>
    </div>
  );
}

export default QuestionCategory;

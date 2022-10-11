import Category from "./QuestionCategory";
import styles from "./QuestionCategories.module.css";

function QuestionCategories(props) {
  return (
    <ul className={styles.categories}>
      {props.categories.map((category) => {
        return (
          <li key={category.text} className={styles.category}>
            <Category text={category.text} />
          </li>
        );
      })}
    </ul>
  );
}

export default QuestionCategories;

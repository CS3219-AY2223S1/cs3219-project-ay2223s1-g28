import Category from "./QuestionCategory";
import styles from "./QuestionCategories.module.css";

function QuestionCategories(props) {
  return (
    <ul className={styles.categories}>
      {props.categories.map((category) => {
        return (
          <li key={category.id} className={styles.category}>
            <Category text={category} />
          </li>
        );
      })}
    </ul>
  );
}

export default QuestionCategories;

import Category from "./QuestionCategory";
import styles from "./QuestionCategories.module.css";

function QuestionCategories({categories}) {
  return (
    <ul className={styles.categories}>
      {categories.map((category) => {
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

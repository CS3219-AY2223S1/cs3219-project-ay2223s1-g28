import Category from "./QuestionCategory";
import style from "./QuestionCategories.module.css";

function QuestionCategories(props) {
  return (
    <ul className={style.categories}>
      {props.categories.map((category) => {
        return (
          <li key={category.id} className={style.category}>
            <Category text={category.text} />
          </li>
        );
      })}
    </ul>
  );
}

export default QuestionCategories;

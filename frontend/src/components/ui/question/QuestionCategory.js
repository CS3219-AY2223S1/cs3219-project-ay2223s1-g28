import style from "./QuestionCategory.module.css";

function QuestionCategory(props) {
  return (
    <div className={style.category_bubble}>
      <p className={style.category_text}>{props.text}</p>
    </div>
  );
}

export default QuestionCategory;

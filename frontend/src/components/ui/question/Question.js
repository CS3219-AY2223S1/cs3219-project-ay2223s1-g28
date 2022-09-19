import style from "./Question.module.css";

function Question(props) {
  return (
    <div>
      <p className={style.question}>{props.question}</p>
    </div>
  );
}

export default Question;

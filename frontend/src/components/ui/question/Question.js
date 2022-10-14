import styles from "./Question.module.css";

function Question(props) {
  function convertStringtoHtml() {
    return { __html: props.question };
  }

  return (
    <>
      <div className={styles.question}>
        <div dangerouslySetInnerHTML={convertStringtoHtml()}></div>
      </div>
    </>
  );
}

export default Question;

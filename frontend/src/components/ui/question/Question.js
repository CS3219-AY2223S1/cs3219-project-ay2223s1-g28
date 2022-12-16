import styles from "./Question.module.css";

function Question({question}) {
  function convertStringtoHtml() {
    return { __html: question };
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

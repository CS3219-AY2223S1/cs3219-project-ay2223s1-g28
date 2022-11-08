import styles from './Card.module.css';

function Card({ text, imageUrl, footer }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src={imageUrl}
          alt="Difficulty Card"
          height="100%"
          width="100%"
        />
        <h1>
          <strong>{text}</strong>
        </h1>
        <div className={styles['card-footer']}>{footer}</div>
      </div>
    </div>
  );
}

export default Card;

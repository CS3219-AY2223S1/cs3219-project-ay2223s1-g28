import styles from './Card.module.css';

function Card({ text, footer }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src={require('../../assets/signin.svg').default}
          alt="Difficulty Card"
          height="100%"
          width="100%"
        />
        <p>{text}</p>
        <p className={styles['card-footer']}>{footer}</p>
      </div>
    </div>
  );
}

export default Card;

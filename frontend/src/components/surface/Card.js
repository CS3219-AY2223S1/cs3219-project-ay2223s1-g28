import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ level, imageUrl, footer }) {
  const navigate = useNavigate();

  const selectDifficulty = (e) => {
    navigate('/match', { state: { difficulty: level } });
  };

  return (
    <div className={styles.container} onClick={selectDifficulty}>
      <div className={styles.card}>
        <img src={imageUrl} alt="Difficulty Card" height="100%" width="100%" />
        <h1>
          <strong>{level}</strong>
        </h1>
        <div className={styles['card-footer']}>{footer}</div>
      </div>
    </div>
  );
}

export default Card;

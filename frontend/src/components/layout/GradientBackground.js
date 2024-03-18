import styles from './GradientBackground.module.css';

function GradientBackground({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.children}>{children}</div>
    </div>
  );
}

export default GradientBackground;

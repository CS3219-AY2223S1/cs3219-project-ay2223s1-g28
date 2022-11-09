import styles from './CenterContainer.module.css';

function CenterContainer({ children }) {
  return <div className={styles.center_container}>{children}</div>;
}

export default CenterContainer;

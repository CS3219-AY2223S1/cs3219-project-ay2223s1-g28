import Container from '@mui/material/Container';

import styles from './OutlinedContainer.module.css';

function OutlinedContainer(props) {
  return (
    <Container
      className={`${styles.container__border} ${styles.container__shadow} ${styles['border--green']}`}
    >
      {props.children}
    </Container>
  );
}

export default OutlinedContainer;

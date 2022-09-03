import Container from '@mui/material/Container';

import styles from './OutlinedContainer.module.css';

function OutlinedContainer(props) {
  return (
    <Container className={styles.outlined_container}>
      {props.children}
    </Container>
  );
}

export default OutlinedContainer;

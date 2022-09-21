import Container from '@mui/material/Container';

import styles from './OutlinedContainer.module.css';

function OutlinedContainer(props) {
  return (
    <Container className={props.customClassName || styles.outlined_container} sx={props.customStyle}>
      {props.children}
    </Container>
  );
}

export default OutlinedContainer;

import Container from "@mui/material/Container";

import styles from "./DifficultyButtonGroup.module.css";

function DifficultyButtonGroup(props) {
  return (
    <>
      <Container className={styles.easy_container}>{props.children}</Container>
      <Container className={styles.medium_container}>{props.children}</Container>
      <Container className={styles.hard_container}>{props.children}</Container>
    </>
  );
}

export default DifficultyButtonGroup;

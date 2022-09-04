import { Button, ButtonGroup, Container } from "@mui/material";

import React from "react";

import styles from "./DifficultyButtonGroup.module.css";

function DifficultyButtonGroup(props) {
  return (
    <>
      <Container className={styles.container}>
        <ButtonGroup>
          <Button className={styles.easy} variant="outlined" size="large">
            Easy
          </Button>
          <Button className={styles.medium} variant="outlined" size="large">
            Medium
          </Button>
          <Button className={styles.hard} variant="outlined" size="large">
            Hard
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
}

export default DifficultyButtonGroup;

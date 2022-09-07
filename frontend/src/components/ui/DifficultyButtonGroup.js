import { ButtonGroup, Container } from "@mui/material";

import React from "react";

import styles from "./DifficultyButtonGroup.module.css";

import DifficultyButton from "./DifficultyButton.js";

function DifficultyButtonGroup() {
  return (
    <Container className={styles.container}>
      <ButtonGroup>
        <DifficultyButton buttonText="Easy"/>
        <DifficultyButton buttonText="Medium"/>
        <DifficultyButton buttonText="Hard"/>
      </ButtonGroup>
    </Container>
  );
}

export default DifficultyButtonGroup;

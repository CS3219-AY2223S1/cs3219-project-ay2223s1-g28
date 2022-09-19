import { ButtonGroup, Container } from "@mui/material";

import React from "react";

import styles from "./DifficultyButtonGroup.module.css";

import DifficultyButton from "./DifficultyButton.js";

function DifficultyButtonGroup() {
  return (
    <Container className={styles.container}>
      <ButtonGroup>
        <DifficultyButton buttonText="Easy" id="easyDifficulty" />
        <DifficultyButton buttonText="Medium" id="mediumDifficulty"/>
        <DifficultyButton buttonText="Hard" id="hardDifficulty"/>
      </ButtonGroup>
    </Container>
  );
}

export default DifficultyButtonGroup;

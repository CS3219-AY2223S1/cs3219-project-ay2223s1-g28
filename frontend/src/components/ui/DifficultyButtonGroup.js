import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";

import DifficultyButton from "./DifficultyButton.js";
import styles from "./DifficultyButtonGroup.module.css";

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

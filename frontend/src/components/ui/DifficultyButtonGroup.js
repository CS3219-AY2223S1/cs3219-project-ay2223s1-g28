import { Button } from "@mui/material";

import styles from "./DifficultyButtonGroup.module.css";

function DifficultyButtonGroup(props) {
  return (
    <>
      <Button
        className={styles.easy}
        variant="outlined"
        size="large"
      >
        Easy
      </Button>
      <Button
        className={styles.medium}
        variant="outlined"
        size="large"
      >
        Medium
      </Button>
      <Button
        className={styles.hard}
        variant="outlined"
        size="large"
      >
        Hard
      </Button>
    </>
  );
}

export default DifficultyButtonGroup;

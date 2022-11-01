import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';

import DifficultyButton from './DifficultyButton.js';
import styles from './DifficultyButtonGroup.module.css';

function DifficultyButtonGroup() {
  const isMobileView = useMediaQuery('(max-width:900px)');

  return (
    <Container className={styles.container}>
      <ButtonGroup orientation={isMobileView ? 'vertical' : 'horizontal'}>
        <DifficultyButton buttonText="Easy" id="easyDifficulty" />
        <DifficultyButton buttonText="Medium" id="mediumDifficulty" />
        <DifficultyButton buttonText="Hard" id="hardDifficulty" />
      </ButtonGroup>
    </Container>
  );
}

export default DifficultyButtonGroup;

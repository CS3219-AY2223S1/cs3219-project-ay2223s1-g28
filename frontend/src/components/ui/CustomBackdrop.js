import Backdrop from '@mui/material/Backdrop';
import OutlinedContainer from './OutlinedContainer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import styles from './CustomBackdrop.module.css';

function CustomBackdrop({
  openBackdrop,
  onClick,
  title,
  content,
  primaryAction,
  secondaryAction,
}) {
  return (
    <Backdrop open={openBackdrop} onClick={onClick} invisible>
      <OutlinedContainer customClassName={styles.backdrop_card}>
        <Grid container direction="column" alignItems="center" rowGap={1}>
          <Grid item>{title}</Grid>
          <Grid item>{content}</Grid>
          <Grid
            item
            container
            justifyContent="center"
            direction="row"
            columnGap={5}
          >
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={primaryAction.onClick}
            >
              {primaryAction.text}
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="error"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.text}
            </Button>
          </Grid>
        </Grid>
      </OutlinedContainer>
    </Backdrop>
  );
}

export default CustomBackdrop;

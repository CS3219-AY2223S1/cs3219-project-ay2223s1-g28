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
            xs={6}
            container
            justifyContent="center"
            direction="row"
            columnSpacing={5}
          >
            <Grid item xs={3}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={primaryAction.onClick}
                fullWidth
              >
                {primaryAction.text}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                size="large"
                color="error"
                onClick={secondaryAction.onClick}
                fullWidth
              >
                {secondaryAction.text}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </OutlinedContainer>
    </Backdrop>
  );
}

export default CustomBackdrop;

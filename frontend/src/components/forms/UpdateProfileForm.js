import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import OutlinedContainer from '../ui/OutlinedContainer';
import CustomTextField from '../inputs/CustomTextField';

import styles from './UpdateProfileForm.module.css';

function UpdateProfileForm() {
  return (
    <OutlinedContainer customStyle={{ width: '60%' }}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={1}>
          <PersonOutlineIcon color="primary" sx={{ fontSize: 80, mt: 1 }} />
        </Grid>
        <Grid
          item
          xs={8}
          container
          direction="row"
          justifyContent="center"
          rowGap={5}
          sx={{ m: '50px 0' }}
        >
          <Grid item xs={12}>
            <CustomTextField
              leftNode={<Typography>Username:</Typography>}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              leftNode={<Typography>Password:</Typography>}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              className={styles.update_profile_button}
              variant="outlined"
              size="large"
              type="submit"
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          xs={1}
          container
          direction="column-reverse"
          alignItems="flex-end"
        >
          <Grid item>
            <Typography textAlign="end" sx={{ mb: 1 }}>
              PeerCard
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </OutlinedContainer>
  );
}

export default UpdateProfileForm;

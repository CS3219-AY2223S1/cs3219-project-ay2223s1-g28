import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import IconTextField from '../ui/IconTextField';
import styles from './SigninForm.module.css';

function SigninForm() {
  return (
    <Grid
      className={styles.signin_form}
      container
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item xs={12}>
        <IconTextField
          icon={<AccountCircle color="primary" fontSize="large" />}
          label="Email/Username"
        />
      </Grid>
      <Grid item xs={12}>
        <IconTextField
          icon={<HttpsOutlinedIcon color="primary" fontSize="large" />}
          label="Password"
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Button className={styles.signin_button} variant="outlined" size="large">
          Sign in
        </Button>
        <Typography variant="button">
          Don't have an account? <Button href="/signup">Sign up here!</Button>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SigninForm;

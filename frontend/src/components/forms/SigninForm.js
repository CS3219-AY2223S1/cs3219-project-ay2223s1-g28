import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import IconTextField from '../ui/IconTextField';

function SigninForm() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
        <IconTextField
          icon={<AccountCircle color="primary" fontSize="large" />}
          label="Email/Username"
        />
      </Grid>
      <Grid item>
        <IconTextField
          icon={<HttpsOutlinedIcon color="primary" fontSize="large" />}
          label="Password"
        />
      </Grid>
      <Grid item>
        <Button variant="outlined" size="large">
          Sign in
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="button">
          Don't have an account? 
        </Typography>
        <Button href="/signup">Sign up here!</Button>
      </Grid>
    </Grid>
  );
}

export default SigninForm;

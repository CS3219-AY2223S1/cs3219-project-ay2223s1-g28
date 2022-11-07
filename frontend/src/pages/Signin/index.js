import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import SigninForm from '../../components/forms/SigninForm';

function SigninPage() {
  const isMobileView = useMediaQuery('(max-width:900px)');

  return (
    <Grid
      container
      direction={isMobileView ? 'column' : 'row'}
      alignItems="center"
    >
      <Grid item xs={6}>
        <img
          src={require('../../assets/signin.svg').default}
          alt="Signin"
          height="100%"
          width="100%"
        />
      </Grid>
      <Grid item xs={6}>
        <SigninForm />
      </Grid>
    </Grid>
  );
}

export default SigninPage;

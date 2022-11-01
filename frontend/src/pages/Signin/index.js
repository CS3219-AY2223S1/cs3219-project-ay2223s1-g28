import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import OutlinedContainer from '../../components/ui/OutlinedContainer';
import SigninForm from '../../components/forms/SigninForm';
import GreenDivider from '../../components/ui/GreenDivider';

function SigninPage() {
  const isMobileView = useMediaQuery('(min-width:900px)');

  return (
    <OutlinedContainer>
      <Grid
        container
        direction={isMobileView ? 'row' : 'column'}
        justifyContent="space-evenly"
        alignItems="center"
        gap={5}
      >
        <Grid item xs={5}>
          <Typography
            variant="h5"
            fontWeight="lighter"
            textAlign="center"
            sx={{ mt: '32px' }}
          >
            Start acing your technical interview with{' '}
            <Typography variant="h5" component="span" fontWeight="bold">
              PeerPrep
            </Typography>
          </Typography>
          <img
            src={require('../../assets/signin_form_media.svg').default}
            alt="Signin form"
            width="100%"
          />
        </Grid>
        <GreenDivider />
        <Grid item xs={5}>
          <SigninForm />
        </Grid>
      </Grid>
    </OutlinedContainer>
  );
}

export default SigninPage;

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import WarningIcon from '@mui/icons-material/Warning';

import UpdateProfileForm from '../../components/forms/UpdateProfileForm';

function ProfilePage() {
  const deleteAccountHandler = () => {}
  
  return (
    <Grid container direction="column" rowGap={12}>
      <Grid item alignSelf="flex-end">
        <Button
          variant="outlined"
          size="large"
          color="error"
          startIcon={<WarningIcon />}
          onClick={deleteAccountHandler}
        >
          Delete Account
        </Button>
      </Grid>
      <Grid item>
        <UpdateProfileForm />
      </Grid>
    </Grid>
  );
}

export default ProfilePage;

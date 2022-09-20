import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import WarningIcon from '@mui/icons-material/Warning';

import UpdateProfileForm from '../../components/forms/UpdateProfileForm';

import AlertContext from '../../context/alert-context';
import UserContext from '../../context/user-context';

function ProfilePage() {
  const alertCtx = useContext(AlertContext);
  const userCtx = useContext(UserContext);

  const navigate = useNavigate();

  const deleteAccountHandler = () => {
    userCtx.onDeleteAccount((deleteSuccessMessage, err) => {
      if (err || !deleteSuccessMessage) {
        return alertCtx.onShow(
          err ? err.message : 'Delete account failed, please try again later!'
        );
      }
      alertCtx.onShow(deleteSuccessMessage, 'success');
      navigate('/signup');
    });
  };

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

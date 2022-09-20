import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import WarningIcon from '@mui/icons-material/Warning';

import UpdateProfileForm from '../../components/forms/UpdateProfileForm';
import CustomBackdrop from '../../components/ui/CustomBackdrop';

import AlertContext from '../../context/alert-context';
import UserContext from '../../context/user-context';
import { Typography } from '@mui/material';

function ProfilePage() {
  const alertCtx = useContext(AlertContext);
  const userCtx = useContext(UserContext);

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const navigate = useNavigate();

  const toggleBackdropHandler = () => setOpenBackdrop(!openBackdrop);

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
          onClick={toggleBackdropHandler}
        >
          Delete Account
        </Button>
      </Grid>
      <Grid item>
        <UpdateProfileForm />
      </Grid>
      <CustomBackdrop
        openBackdrop={openBackdrop}
        onClick={toggleBackdropHandler}
        content={
          <Typography>Are you sure you want to delete this account?</Typography>
        }
        primaryAction={{ text: 'Delete', onClick: deleteAccountHandler }}
        secondaryAction={{
          text: 'No',
          onClick: toggleBackdropHandler,
        }}
      />
    </Grid>
  );
}

export default ProfilePage;

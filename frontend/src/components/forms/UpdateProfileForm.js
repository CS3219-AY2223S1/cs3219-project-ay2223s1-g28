import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BigButton from '../inputs/BigButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import WarningIcon from '@mui/icons-material/Warning';

import useInput from '../../hooks/use-input';
import AlertContext from '../../context/alert-context';
import UserContext from '../../context/user-context';
import isValidPassword from '../../validators/password-validator';
import PasswordTextField from '../inputs/PasswordTextField';
import CustomBackdrop from '../../components/ui/CustomBackdrop';
import Header from '../../components/ui/Header';
import Caption from '../../components/ui/Caption';

function UpdateProfileForm() {
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

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    errorHelperText: passwordErrorHelperText,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isValidPassword);

  let formIsValid = false;

  if (!passwordValue || passwordIsValid) {
    // If the field is empty, assume it to be true since it will not update the profile
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    userCtx.onUpdateAccount(passwordValue, (updateSuccessMessage, err) => {
      if (err || !updateSuccessMessage) {
        alertCtx.onShow(err ? err.response.data.message : 'Update failed!');
        return;
      }

      alertCtx.onShow(updateSuccessMessage, 'success');
      navigate('/home');
    });

    resetPassword();
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={6}
        height="100%"
      >
        <Grid item xs={12}>
          <Header text="Update account!" />
          <Caption text="all in your control" />
        </Grid>
        <Grid item xs={12}>
          <PasswordTextField
            label="Password"
            type="password"
            value={passwordValue}
            error={passwordHasError}
            helperText={passwordHasError && passwordErrorHelperText}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <BigButton
            buttonProps={{
              variant: 'contained',
              size: 'large',
              type: 'submit',
              fullWidth: true,
              disabled: !passwordValue,
            }}
            sx={{
              color: 'white',
              margin: '10px 0',
            }}
          >
            Update Password
          </BigButton>
          <BigButton
            buttonProps={{
              variant: 'outlined',
              size: 'large',
              fullWidth: true,
              color: 'primary',
            }}
            sx={{
              margin: '10px 0',
            }}
            onClick={() => navigate('/home')}
          >
            Back to Home
          </BigButton>
          <Divider sx={{ margin: '64px 0' }} />
          <BigButton
            buttonProps={{
              variant: 'outlined',
              size: 'large',
              type: 'submit',
              fullWidth: true,
              color: 'error',
              startIcon: <WarningIcon />,
            }}
            onClick={toggleBackdropHandler}
            fullWidth
          >
            Delete Account
          </BigButton>
        </Grid>
      </Grid>
      <CustomBackdrop
        openBackdrop={openBackdrop}
        onClick={toggleBackdropHandler}
        content={
          <Typography>Are you sure you want to delete this account?</Typography>
        }
        primaryAction={{
          text: 'No',
          onClick: toggleBackdropHandler,
        }}
        secondaryAction={{ text: 'Delete', onClick: deleteAccountHandler }}
      />
    </form>
  );
}

export default UpdateProfileForm;

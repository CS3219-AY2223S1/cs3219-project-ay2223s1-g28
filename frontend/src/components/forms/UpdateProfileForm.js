import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import OutlinedContainer from '../ui/OutlinedContainer';

import useInput from '../../hooks/use-input';

import AlertContext from '../../context/alert-context';
import UserContext from '../../context/user-context';

import isValidPassword from '../../validators/password-validator';
import isValidUsername from '../../validators/username-validator';

import styles from './UpdateProfileForm.module.css';

function UpdateProfileForm() {
  const alertCtx = useContext(AlertContext);
  const userCtx = useContext(UserContext);

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    errorHelperText: usernameErrorHelperText,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isValidUsername);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    errorHelperText: passwordErrorHelperText,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isValidPassword);

  const navigate = useNavigate();

  let formIsValid = false;

  if (
    (!usernameValue || usernameIsValid) &&
    (!passwordValue || passwordIsValid)
  ) {
    // If the field is empty, assume it to be true since it will not update the profile
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    userCtx.onUpdateAccount(
      usernameValue,
      passwordValue,
      (updateSuccessMessage, err) => {
        if (err || !updateSuccessMessage) {
          alertCtx.onShow(err ? err.response.data.message : 'Update failed!');
          return;
        }

        alertCtx.onShow(updateSuccessMessage, 'success');
        navigate('/home');
      }
    );

    resetUsername();
    resetPassword();
  };

  return (
    <form onSubmit={submitHandler}>
      <OutlinedContainer
        customStyle={{ width: '75vw', maxWidth: '800px !important' }}
      >
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={1}>
            <PersonOutlineIcon color="primary" sx={{ fontSize: 80, mt: 1 }} />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            lg={8}
            container
            direction="row"
            justifyContent="center"
            rowGap={5}
            sx={{ m: '50px 0' }}
          >
            <Grid item xs={12}>
              <TextField
                value={usernameValue}
                error={usernameHasError}
                helperText={usernameHasError && usernameErrorHelperText}
                onChange={usernameChangeHandler}
                onBlur={usernameBlurHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                value={passwordValue}
                error={passwordHasError}
                helperText={passwordHasError && passwordErrorHelperText}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
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
            xs={0}
            md={1}
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
    </form>
  );
}

export default UpdateProfileForm;

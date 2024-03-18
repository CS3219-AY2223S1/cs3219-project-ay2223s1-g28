import { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import BigButton from '../inputs/BigButton';

import AlertContext from '../../context/alert-context';
import UserContext from '../../context/user-context';
import useInput from '../../hooks/use-input';
import isValidUsername from '../../validators/username-validator';
import isValidPassword from '../../validators/password-validator';
import Header from '../../components/ui/Header';
import Caption from '../../components/ui/Caption';

function SigninForm() {
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

  if (usernameIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    userCtx.onSignin(usernameValue, passwordValue, (isSigninSuccess, err) => {
      if (err || !isSigninSuccess) {
        alertCtx.onShow(err ? err.response.data.message : 'Sign in failed!');
        return;
      }

      alertCtx.onShow('Login successfully', 'success');
      navigate('/home');
    });

    resetUsername();
    resetPassword();
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid container justifyContent="center" alignItems="center" spacing={6}>
        <Grid item xs={12}>
          <Header text="Welcome back to PeerPrep!" />
          <Caption text="signin to continue" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email/Username"
            value={usernameValue}
            error={usernameHasError}
            helperText={usernameHasError && usernameErrorHelperText}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            value={passwordValue}
            error={passwordHasError}
            helperText={passwordHasError && passwordErrorHelperText}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <BigButton
            buttonProps={{
              variant: 'contained',
              type: 'submit',
              fullWidth: true,
            }}
            sx={{
              color: 'white',
            }}
          >
            Sign in
          </BigButton>
        </Grid>
        <Grid item>
          <Typography variant="button">
            Don't have an account?{' '}
            <Typography component={Link} to="/signup" color="primary">
              Sign up here!
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
}

export default SigninForm;

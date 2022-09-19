import { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import IconTextField from '../inputs/IconTextField';
import styles from './SigninForm.module.css';

import AlertContext from '../../context/alert-context';
import UserContext from '../../context/user-context';

import useInput from '../../hooks/use-input';

import isValidUsername from '../../validators/username-validator';
import isValidPassword from '../../validators/password-validator';

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
        alertCtx.onShow(err ? err.response.data.message : "Sign in failed!");
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
      <Grid
        className={styles.signin_form}
        container
        justifyContent="center"
        alignItems="center"
        spacing={6}
      >
        <Grid item xs={12}>
          <IconTextField
            icon={<AccountCircle color="primary" fontSize="large" />}
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
          <IconTextField
            icon={<HttpsOutlinedIcon color="primary" fontSize="large" />}
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
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={1}
        >
          <Grid item>
            <Button
              className={styles.signin_button}
              variant="outlined"
              size="large"
              type="submit"
            >
              Sign in
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="button">
              Don't have an account?{' '}
              <Link to="/signup" className={styles.signup_link}>
                Sign up here!
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default SigninForm;

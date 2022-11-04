import { useContext } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import PasswordTextField from '../inputs/PasswordTextField';
import styles from './SignupForm.module.css';

import AlertContext from '../../context/alert-context';

import useInput from '../../hooks/use-input';

import isValidUsername from '../../validators/username-validator';
import isValidEmail from '../../validators/email-validator';
import isValidPassword from '../../validators/password-validator';

import { URL_USER_SVC_SIGNUP } from '../../configs';
import { STATUS_CODE_CREATED } from '../../constants';

function SignupForm() {
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
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    errorHelperText: emailErrorHelperText,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isValidEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    errorHelperText: passwordErrorHelperText,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isValidPassword);

  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    errorHelperText: confirmPasswordErrorHelperText,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((confirmPasswordValue) => [
    confirmPasswordValue === passwordValue,
    'Password and Confirm password are different',
  ]);

  const alertCtx = useContext(AlertContext);

  const navigate = useNavigate();

  let formIsValid = false;

  if (
    usernameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const res = await axios
      .post(URL_USER_SVC_SIGNUP, {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
      })
      .catch((err) => {
        alertCtx.onShow(err.response.data.message);
      });
    if (res && res.status === STATUS_CODE_CREATED) {
      alertCtx.onShow('Account successfully created', 'success');
      navigate('/signin');
    }

    resetUsername();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid
        className={styles.signup_form}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowGap={5}
      >
        <TextField
          label="Username"
          variant="filled"
          value={usernameValue}
          error={usernameHasError}
          helperText={usernameHasError && usernameErrorHelperText}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          fullWidth
          required
        />
        <TextField
          label="Email"
          variant="filled"
          value={emailValue}
          error={emailHasError}
          helperText={emailHasError && emailErrorHelperText}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          fullWidth
          required
        />
        <PasswordTextField
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
        <PasswordTextField
          label="Confirm Password"
          type="password"
          value={confirmPasswordValue}
          error={confirmPasswordHasError}
          helperText={confirmPasswordHasError && confirmPasswordErrorHelperText}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          fullWidth
          required
        />
        <Button
          className={styles.signup_button}
          variant="outlined"
          size="large"
          type="submit"
        >
          Sign up
        </Button>
      </Grid>
    </form>
  );
}

export default SignupForm;

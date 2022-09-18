import { useContext } from 'react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import IconTextField from '../inputs/IconTextField';
import styles from './SigninForm.module.css';

import AlertContext from '../../context/alert-context';

import useInput from '../../hooks/use-input';

import isValidUsername from '../../validators/username-validator';
import isValidPassword from '../../validators/password-validator';

import { URL_USER_SVC } from '../../configs';
import { STATUS_CODE_OK } from '../../constants';

const SIGNIN_ROUTE = '/signin';

function SigninForm() {
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

  const alertCtx = useContext(AlertContext);

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

    const res = await axios
      .post(URL_USER_SVC + SIGNIN_ROUTE, {
        username: usernameValue,
        password: passwordValue,
      })
      .catch((err) => {
        alertCtx.onShow(err.response.data.message);
      });
    if (res && res.status === STATUS_CODE_OK) {
      alertCtx.onShow('Login successfully', 'success');
      navigate('/home');
    }

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
              <Link to="/signup" style={{ color: '#0078FF' }}>
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

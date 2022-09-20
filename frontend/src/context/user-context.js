import { createContext, useState } from 'react';

import axios from 'axios';

import { URL_USER_SVC } from '../configs';
import { STATUS_CODE_OK } from '../constants';

const SIGNIN_ROUTE = '/signin';
// Note:
// Change to NGINX URL to check for JWT validity in the future,
// using user service URL at the moment
const JWT_VERIFICATION_ENDPOINT = 'http://localhost:8000/api/user/verify-jwt';
const LOGOUT_ENDPOINT = 'http://localhost:8000/api/user/logout';

const UserContext = createContext({
  isSignedIn: false,
  onVerifyToken: () => {},
  onSignout: () => {},
  onSignin: () => {},
});

export function UserContextProvider(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const verifyTokenHandler = async (callback) => {
    await axios
      // Must set "withCredentials" to true so the cookie stored on browser
      // is sent to the server for checking
      .get(JWT_VERIFICATION_ENDPOINT, { withCredentials: true })
      .then((res) => {
        const isAuthSuccess = res && res.status === STATUS_CODE_OK;
        setIsSignedIn(isAuthSuccess);
        callback(isAuthSuccess, null);
      })
      .catch((error) => {
        setIsSignedIn(false);
        callback(false, error);
      });
  };

  const signinHandler = async (username, password, callback) => {
    await axios
      .post(
        URL_USER_SVC + SIGNIN_ROUTE,
        {
          username,
          password,
        },
        { withCredentials: true } // Crucial step to make sure the cookie is stored in browser
      )
      .then((res) => {
        const isSigninSuccess = res && res.status === STATUS_CODE_OK;

        setIsSignedIn(isSigninSuccess);
        callback(isSigninSuccess, null);
      })
      .catch((err) => {
        callback(false, err);
      });
  };

  const signoutHandler = async (callback) => {
    await axios
      // Must set "withCredentials" to true so the cookie stored on browser
      // is sent to the server for checking
      .post(LOGOUT_ENDPOINT, {}, { withCredentials: true })
      .then((res) => {
        const isSignoutSuccess = res && res.status === STATUS_CODE_OK;
        setIsSignedIn(isSignoutSuccess);
        return res.data;
      })
      .then((data) => {
        callback(data.message, null);
      })
      .catch((error) => {
        setIsSignedIn(false);
        callback(false, error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        isSignedIn,
        onVerifyToken: verifyTokenHandler,
        onSignin: signinHandler,
        onSignout: signoutHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;

import { createContext, useState } from 'react';
import axios from 'axios';

import { 
  URL_AUTH_SVC_JWT_VERIFICATION, 
  URL_AUTH_SVC_SIGNIN, 
  URL_AUTH_SVC_SIGNOUT, 
  URL_USER_SVC_UPDATE, 
  URL_USER_SVC_DELETE,
} from '../configs';
import { STATUS_CODE_OK } from '../constants';

const UserContext = createContext({
  username: '',
  isSignedIn: false,
  onVerifyToken: () => {},
  onSignout: () => {},
  onSignin: () => {},
  onUpdateAccount: () => {},
  onDeleteAccount: () => {},
});

export function UserContextProvider(props) {
  const [username, setUsername] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const verifyTokenHandler = async (callback) => {
    await axios
      // Must set "withCredentials" to true so the cookie stored on browser
      // is sent to the server for checking
      .get(URL_AUTH_SVC_JWT_VERIFICATION, { withCredentials: true })
      .then((res) => {
        const isAuthSuccess = res && res.status === STATUS_CODE_OK;
        setIsSignedIn(isAuthSuccess);
        callback(isAuthSuccess, null);
        return res.data;
      })
      .then((data) => setUsername(data.username))
      .catch((error) => {
        setIsSignedIn(false);
        callback(false, error);
      });
  };

  const signinHandler = async (usernameOrEmail, password, callback) => {
    await axios
      .post(
        URL_AUTH_SVC_SIGNIN,
        {
          usernameOrEmail,
          password,
        },
        { withCredentials: true } // Crucial step to make sure the cookie is stored in browser
      )
      .then((res) => {
        const isSigninSuccess = res && res.status === STATUS_CODE_OK;

        setIsSignedIn(isSigninSuccess);
        setUsername(usernameOrEmail);
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
      .get(URL_AUTH_SVC_SIGNOUT, { withCredentials: true })
      .then((res) => {
        const isSignoutSuccess = res && res.status === STATUS_CODE_OK;
        setIsSignedIn(!isSignoutSuccess);
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

  const updateAccountHandler = async (newPassword, callback) => {
    await axios
      // Must set "withCredentials" to true so the cookie stored on browser
      // is sent to the server for checking
      .put(
        URL_USER_SVC_UPDATE + '/' + username,
        { newPassword },
        { withCredentials: true }
      )
      .then((res) => {
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

  const deleteAccountHandler = async (callback) => {
    await axios
      // Must set "withCredentials" to true so the cookie stored on browser
      // is sent to the server for checking
      .delete(
        URL_USER_SVC_DELETE + '/' + username,
        { withCredentials: true }
      )
      .then(async(res) => {
        const isDeleteSuccess = res && res.status === STATUS_CODE_OK;
        if (isDeleteSuccess) {
          await axios
            .get(URL_AUTH_SVC_SIGNOUT, { withCredentials: true })
            .then((res) => {
              const isSignoutSuccess = res && res.status === STATUS_CODE_OK;
              setIsSignedIn(!isSignoutSuccess);
              return res.data;
            })
        }
        setIsSignedIn(false); 
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
        username,
        isSignedIn,
        onVerifyToken: verifyTokenHandler,
        onSignin: signinHandler,
        onSignout: signoutHandler,
        onUpdateAccount: updateAccountHandler,
        onDeleteAccount: deleteAccountHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;

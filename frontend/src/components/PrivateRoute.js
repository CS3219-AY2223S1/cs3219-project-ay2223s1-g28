import { useContext, useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import AlertContext from '../context/alert-context';

import { STATUS_CODE_OK } from '../constants';
import UserContext from '../context/user-context';

// Todo: Change to NGINX URL to check for JWT validity,
// using user service URL at the moment
const JWT_VERIFICATION_ENDPOINT = 'http://localhost:8000/api/user/verify-jwt';

function PrivateRoute() {
  const alertCtx = useContext(AlertContext);
  const userCtx = useContext(UserContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    userCtx.onVerifyToken((isAuthSuccess, err) => {
      if (err || !isAuthSuccess) {
        alertCtx.onShow(
          `${
            err
              ? err.response.data.message
              : 'Invalid token, please signin again!'
          }`
        );
      }

      setIsAuthenticated(isAuthSuccess);
      setChecked(true);
    });
  }, []);

  if (checked) {
    // Crucial step to make sure that we do not return anything
    // before we get a response from server and set "isAuthenticated" state
    // Else, it will navigate back to signin page even before
    // "isAuthenticated" state is set to true
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
  }
}

export default PrivateRoute;

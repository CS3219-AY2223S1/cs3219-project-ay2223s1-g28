import { useContext, useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import AlertContext from '../context/alert-context';
import UserContext from '../context/user-context';

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
  }, [userCtx, alertCtx]);

  if (checked) {
    // Crucial step to make sure that we do not return anything
    // before we get a response from server and set "isAuthenticated" state
    // Else, it will navigate back to signin page even before
    // "isAuthenticated" state is set to true
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
  }
}

export default PrivateRoute;

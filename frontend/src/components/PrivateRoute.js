import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { STATUS_CODE_OK } from "../constants";

function PrivateRoute(props) {
  const [isAuthenticated, setAuthentication] = useState();
  useEffect(() => {
    const res = axios
      .get(props.path, { withCredentials: true })
      .catch((error) => {
        console.log("Error!");
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      setAuthentication(true);
    } else {
      setAuthentication(false);
    }
  }, []); //Will run once when component first mounts

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;

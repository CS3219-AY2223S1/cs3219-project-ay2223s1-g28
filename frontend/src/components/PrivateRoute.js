import { Navigate, Outlet } from 'react-router-dom';

/*
Every route that cannot be accessed by a non logged-in user cannot will be wrapped by this component.
*/

function PrivateRoute() {
    return !localStorage.getItem('token') ? <Navigate to='/signin' /> : <Outlet />;
}

export default PrivateRoute;
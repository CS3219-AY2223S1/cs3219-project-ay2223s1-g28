import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    return !localStorage.getItem('token') ? <Navigate to='/signin' /> : <Outlet />;
}

export default PrivateRoute;
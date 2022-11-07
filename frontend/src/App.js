import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute.js';
import AlertMessage from './components/ui/AlertMessage';

const SignupPage = lazy(() => import('./pages/Signup/index'));
const SigninPage = lazy(() => import('./pages/Signin/index'));
const HomePage = lazy(() => import('./pages/Home/index'));
const ProfilePage = lazy(() => import('./pages/Profile/index'));
const RoomPage = lazy(() => import('./pages/Room/index'));
const MatchPage = lazy(() => import('./pages/Match/index'));

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Box display="flex" flexDirection="column" padding="4rem">
          <Suspense
            fallback={
              <div>
                <CircularProgress />
              </div>
            }
          >
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate replace to="/signup" />}
              ></Route>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/match" element={<MatchPage />} />
                <Route path="/room" element={<RoomPage />} />
              </Route>
            </Routes>
          </Suspense>
        </Box>
      </Router>
      <AlertMessage />
    </div>
  );
}

export default App;

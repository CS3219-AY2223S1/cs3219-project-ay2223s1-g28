import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Box from '@mui/material/Box';

import PrivateRoute from './components/PrivateRoute.js';
import AlertMessage from './components/ui/AlertMessage';
import LoadingPage from './pages/Loading';

const SignupPage = lazy(() => import('./pages/Signup/index'));
const SigninPage = lazy(() => import('./pages/Signin/index'));
const HomePage = lazy(() => import('./pages/Home/index'));
const ProfilePage = lazy(() => import('./pages/Profile/index'));
const RoomPage = lazy(() => import('./pages/Room/index'));
const MatchPage = lazy(() => import('./pages/Match/index'));
const NotFoundPage = lazy(() => import('./pages/NotFound/index'));

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta name="CS3219-G28" content="Makes coding fun!" />
        <title>PeerPrep</title>
      </Helmet>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Router>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate replace to="/signin" />}
              />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/match" element={<MatchPage />} />
                <Route path="/room" element={<RoomPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <AlertMessage />
        </Router>
      </Box>
    </HelmetProvider>
  );
}

export default App;

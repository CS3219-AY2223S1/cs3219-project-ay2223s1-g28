import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Box from '@mui/material/Box';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute.js';
import SignupPage from './pages/Signup';
import SigninPage from './pages/Signin';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import RoomPage from './pages/Room';
import MatchPage from './pages/Match';

import AlertMessage from './components/ui/AlertMessage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Box display="flex" flexDirection="column" padding="4rem">
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
        </Box>
      </Router>
      <AlertMessage />
    </div>
  );
}

export default App;

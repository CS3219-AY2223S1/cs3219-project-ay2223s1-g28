import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from './components/Navbar';
import SignupPage from './pages/Signup';
import SigninPage from './pages/Signin';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Box display={'flex'} flexDirection={'column'} padding={'4rem'}>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to="/signup" />}
            ></Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;

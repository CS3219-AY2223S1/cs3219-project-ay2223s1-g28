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

function App() {
  return (
    <div className="App">
      <Navbar />
      <Box display={'flex'} flexDirection={'column'} padding={'4rem'}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to="/signup" />}
            ></Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;

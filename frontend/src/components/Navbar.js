import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white" }}>
            PeerPrep
          </Typography>
          <Button color="secondary" size="large" component={Link} to="/signin">Sign in</Button>
          <Button color="secondary" size="large" component={Link} to="signup">Sign up</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white" }}>
            PeerPrep
          </Typography>
          <Button color="secondary">Sign in</Button>
          <Button color="secondary">Sign up</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import { useContext, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AlertContext from '../context/alert-context';
import UserContext from '../context/user-context';

export default function ButtonAppBar() {
  const alertCtx = useContext(AlertContext);
  const userCtx = useContext(UserContext);
  const isSignedIn = userCtx.isSignedIn;

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const profilePageNavigateHandler = () => {
    navigate('/profile');
    handleClose();
  }

  const signoutHandler = () => {
    userCtx.onSignout((message, err) => {
      if (err) {
        return alertCtx.onShow(err.message);
      }
      alertCtx.onShow(message, 'success');
      navigate('/signin');
    });
    handleClose();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' elevation={0}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, color: 'white', paddingRight: 3 }}>
            PeerPrep
          </Typography>
          {isSignedIn
            ? <>
                <Typography variant='subtitle1' color='secondary'>
                  {userCtx.username}
                </Typography>
                <IconButton size='large' onClick={handleMenu} color='secondary'>
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={profilePageNavigateHandler}>Profile</MenuItem>
                  <MenuItem onClick={signoutHandler}>Logout</MenuItem>
                </Menu>
              </>
            : <>
                <Button color='secondary' size='large' component={Link} to='/signin'>Sign in</Button>
                <Button color='secondary' size='large' component={Link} to='/signup'>Sign up</Button>
              </>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

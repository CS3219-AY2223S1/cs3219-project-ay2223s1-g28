import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import io from 'socket.io-client';

import { URL_MATCHING_SVC_SOCKET, PATH_MATCHING_SVC_SOCKET } from '../../configs';
import AlertContext from '../../context/alert-context';
import UserContext from '../../context/user-context';
import OutlinedContainer from '../../components/ui/OutlinedContainer';
import styles from './Match.module.css';

// Styling
const DARKGREY = '#707070';
const GREY = '#757d86';
const PADDED_BTN = {
  paddingLeft: 6,
  paddingRight: 6,
}
// Timer
const DURATION = 30; 

function MatchPage() {
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const alertCtx = useContext(AlertContext);
  const userCtx = useContext(UserContext);
  const difficulty = location.state?.difficulty;

  // Socket
  const socket = io(URL_MATCHING_SVC_SOCKET, {
    path: PATH_MATCHING_SVC_SOCKET,
  });
  const [room, setRoom] = useState('');
  const [isMatchFailed, setIsMatchFailed] = useState(false);

  // Timer
  const [counter, setCounter] = useState(DURATION);
  const [timerEnd, setTimerEnd] = useState(false);

  useEffect(() => {
    // Check if there is a difficulty selected
    if (!difficulty) {
      navigate('/home');
      alertCtx.onShow('Please select a difficulty level!');
    }

    // Register socket listeners
    socket.on('matchSuccess', (room) => {
      setRoom(room);
    });
    socket.on('matchFail', () => {
      setIsMatchFailed(true);
    });
    socket.on('disconnect', () => {
      setIsMatchFailed(true);
    });

    // Emit match event
    if (difficulty && userCtx.username) {
      socket.emit('match', {
        difficulty,
        username: userCtx.username,
      });
    }
    
    // Disconnect from socket when unmount
    return () => socket.disconnect();
  }, []);

  // Navigate to room page upon successful match
  useEffect(() => {
    if (room) {
      room && navigate('/room', { state: { room } });
    }
  }, [room]);

  // Timer
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(prevCounter => prevCounter - 1), 1000);
    } else {
      setTimerEnd(true);
    }
  }, [counter]);

  // Handlers
  const handleCancel = () => {
    socket.disconnect();
    navigate('/home');
  };
  const handleRetry = () => {
    setIsMatchFailed(false);
    setTimerEnd(false);
    setCounter(DURATION);
    socket.emit('match', { difficulty });
  }

  // Styling
  let boxStyling = styles.difficultyBox;
  switch (difficulty) {
    case 'Easy':
      boxStyling += ' ' + styles.easy;
      break;
    case 'Medium':
      boxStyling += ' ' + styles.medium;
      break;
    case 'Hard':
      boxStyling += ' ' + styles.hard;
      break;
    default:
      break;
  }

  return (
    <OutlinedContainer customStyle={{ width: '450px' }}>
      <Grid container direction='column' alignItems='center' padding={3}>
        <Grid item>
          <div className={boxStyling}>
            <Typography variant='h5' color='white'>{difficulty}</Typography>
          </div>
        </Grid>

        <Grid item mt={2} className={styles.spaceAround}>
          <PersonOutlineIcon color='primary' sx={{ fontSize: 80 }} />
          {isMatchFailed && timerEnd
            ? <CancelOutlinedIcon color='error' sx={{ fontSize: 55}} />
            : <CircularProgress sx={{ color: DARKGREY, margin: 1 }} />}
          <PersonOutlineIcon color='primary' sx={{ fontSize: 80 }} />
        </Grid>

        <Grid item mt={2}>
          <Typography variant='h6' textAlign='center' sx={{ color: GREY, lineHeight: 1.3 }}>
            {isMatchFailed && timerEnd
            ? <>Looks like no one is willing to<br />
                take on your challenge yet.<br />
                Let's try matching again!</>
            : <>We are currently matching you.<br />
                Please wait.</>}
          </Typography>
        </Grid>

        <Grid item mt={5}>
          {!isMatchFailed && timerEnd
            ? <Typography variant='h6' display='inline' sx={{ color: DARKGREY }}>
                Loading...
              </Typography>
            : isMatchFailed && timerEnd
            ? <></>
            : <>
                <Typography variant='h6' display='inline' sx={{ color: DARKGREY }}>
                  Time left:{' '}
                </Typography>
                <Typography variant='h5' display='inline' sx={{ color: DARKGREY }}>
                  {counter} sec
                </Typography>
              </>}
        </Grid>

        <Grid item mt={10} className={styles.spaceAround}>
          {isMatchFailed && timerEnd
          ? <>
              <Button onClick={handleRetry} variant='outlined' size='large' sx={{ color: '#a7c7c8', ...PADDED_BTN }}>
                Retry
              </Button>
              <Button onClick={handleCancel} variant='outlined' color='error' size='large' sx={PADDED_BTN}>
                Cancel
              </Button>
            </>
          : <Button onClick={handleCancel} variant='outlined' color='error' size='large' sx={PADDED_BTN}>
              Cancel
            </Button>}
        </Grid>
      </Grid> 
    </OutlinedContainer>
  );
}

export default MatchPage;

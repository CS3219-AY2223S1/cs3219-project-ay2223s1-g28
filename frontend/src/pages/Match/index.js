import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import io from 'socket.io-client';

import { URL_MATCHING_SVC } from '../../configs';
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
  // Difficulty
  const [difficulty, setDifficulty] = useState('');
  // Socket
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState('');
  const [isMatchFailed, setIsMatchFailed] = useState(false);
  // Timer
  const [counter, setCounter] = useState(DURATION);
  const [timerEnd, setTimerEnd] = useState(false);

  // useEffect
  // Difficulty
  useEffect(() => {
    if (location.state) {
      setDifficulty(location.state?.difficulty);
    }
  }, [location.state]);
  // Socket
  useEffect(() => {
    setSocket(io.connect(URL_MATCHING_SVC));
  }, [])
  useEffect(() => {
    if (socket) {
      socket.on('matchSuccess', (room) => {
        setRoom(room);
      });
      socket.on('matchFail', () => {
        setIsMatchFailed(true);
      });
      socket.on('disconnect', () => {
        setIsMatchFailed(true);
      });
      return () => socket.disconnect();
    }
  }, [socket]);
  useEffect(() => {
    if (difficulty && socket) {
      socket.emit('match', { difficulty });
    }
  }, [difficulty, socket])
  useEffect(() => {
    if (room && navigate) {
      room && navigate('/room', { state: { room } });
    }
  }, [room, navigate]);
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
    socket.emit('cancelMatch', { id: socket.id });
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

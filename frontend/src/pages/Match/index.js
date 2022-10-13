import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import OutlinedContainer from '../../components/ui/OutlinedContainer';
import Timer from './Timer';
import styles from './Match.module.css';

// Styling
const DARKGREY = '#707070';
const GREY = '#757d86';
const PADDED_BTN = {
  paddingLeft: 6,
  paddingRight: 6,
}

function MatchPage() {
  // Hooks
  const [isMatchFailed, setIsMatchFailed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handlers
  const handleCancel = () => {
    navigate('/home');
  };
  const handleRetry = () => {
    setIsMatchFailed(false);
  }

  // Styling
  let boxStyling = styles.difficultyBox;
  switch (location.state?.difficulty) {
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
            <Typography variant='h5' color='white'>{location.state?.difficulty}</Typography>
          </div>
        </Grid>

        <Grid item mt={2} className={styles.spaceAround}>
          <PersonOutlineIcon color='primary' sx={{ fontSize: 80 }} />
          {isMatchFailed
            ? <CancelOutlinedIcon color='error' sx={{ fontSize: 55}} />
            : <CircularProgress sx={{ color: DARKGREY, margin: 1 }} />}
          <PersonOutlineIcon color='primary' sx={{ fontSize: 80 }} />
        </Grid>

        <Grid item mt={2}>
          <Typography variant='h6' textAlign='center' sx={{ color: GREY, lineHeight: 1.3 }}>
            {isMatchFailed
            ? <>Looks like no one is willing to<br />
                take on your challenge yet.<br />
                Let's try matching again!</>
            : <>We are currently matching you.<br />
                Please wait.</>}
          </Typography>
        </Grid>

        <Grid item mt={5}>
          <Typography variant='h6' display='inline' sx={{ color: DARKGREY }}>
            Time left:{' '}
          </Typography>
          <Typography variant='h5' display='inline' sx={{ color: DARKGREY }}>
            <Timer /> sec
          </Typography>
        </Grid>

        <Grid item mt={10} className={styles.spaceAround}>
          {isMatchFailed
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

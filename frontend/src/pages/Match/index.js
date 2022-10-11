import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import OutlinedContainer from '../../components/ui/OutlinedContainer';
import styles from './Match.module.css';
import Timer from './Timer';

function MatchPage() {
  const [isMatchFailed, setIsMatchFailed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCancel = () => {
    navigate('/home');
  };
  const handleRetry = () => {
    setIsMatchFailed(false);
  }

  const darkGrey = '#707070';
  const grey = '#757d86';
  let boxStyling = styles.difficulty_box;
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

        <Grid item mt={2} className={styles.space_around}>
          <PersonOutlineIcon color='primary' sx={{ fontSize: 80 }} />
          {isMatchFailed
            ? <CancelOutlinedIcon color='error' sx={{ fontSize: 55}} />
            : <CircularProgress sx={{ color: darkGrey, margin: 1 }} />}
          <PersonOutlineIcon color='primary' sx={{ fontSize: 80 }} />
        </Grid>

        <Grid item mt={2}>
          <Typography variant='h6' textAlign='center' sx={{ color: grey, lineHeight: 1.3 }}>
            {isMatchFailed
            ? <>Looks like no one is willing to<br />
                take on your challenge yet.<br />
                Let's try matching again!</>
            : <>We are currently matching you.<br />
                Please wait.</>}
          </Typography>
        </Grid>

        <Grid item mt={5}>
          <Typography variant='h6' display='inline' sx={{ color: darkGrey }}>
            Elapsed time:{' '}
          </Typography>
          <Typography variant='h5' display='inline' sx={{ color: darkGrey }}>
            <Timer /> sec
          </Typography>
        </Grid>

        <Grid item mt={10} className={styles.space_around}>
          {isMatchFailed
          ? <>
              <Button onClick={handleRetry} variant='outlined' size='large' sx={{ color: '#a7c7c8', paddingLeft: 6, paddingRight: 6 }}>
                Retry
              </Button>
              <Button onClick={handleCancel} variant='outlined' color='error' size='large' sx={{ paddingLeft: 6, paddingRight: 6 }}>
                Cancel
              </Button>
            </>
          : <Button onClick={handleCancel} variant='outlined' color='error' size='large' sx={{ paddingLeft: 6, paddingRight: 6 }}>
              Cancel
            </Button>}
        </Grid>
      </Grid> 
    </OutlinedContainer>
  );
}

export default MatchPage;

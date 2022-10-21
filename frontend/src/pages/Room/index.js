import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import io from 'socket.io-client';

import AlertContext from '../../context/alert-context';
import ChatBlock from '../../components/ui/chat/ChatBlock';
import CustomBackDrop from '../../components/ui/CustomBackdrop';
import QuestionBox from '../../components/ui/question/QuestionBox';
import CollabEditor from '../../components/ui/collaboration/CollabEditor';
import styles from './Room.module.css';

import { URL_COMM_SVC_CONNECT } from '../../configs';
import { URL_COLLAB_SVC } from '../../configs';

const comm_socket = io(URL_COMM_SVC_CONNECT);
const collab_socket = io(URL_COLLAB_SVC);

function RoomPage() {
  const alertCtx = useContext(AlertContext);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

	const roomId = location.state?.room;

  useEffect(() => {
    if (!roomId) {
      // Prevent user from entering the path '/room' directly
      navigate('/home');
      alertCtx.onShow('Please select a difficulty level!');
      return;
    }

    // Join both communication and collaboration sockets to same room
    comm_socket.emit('join-room', roomId);
    collab_socket.emit('join-room', roomId);

    const createSessionEndListener = (socket) => {
      socket.on('session-end', (message, severity) => {
        // Room leaving is handled by respective server
        navigate('/home');
        alertCtx.onShow(message, severity);
      });
    };

    createSessionEndListener(comm_socket);
    createSessionEndListener(collab_socket);

    // the listeners must be removed in the cleanup step,
    // in order to prevent multiple event registrations
    return () => {
      comm_socket.off('join-room');
      comm_socket.off('session-end');
      collab_socket.off('join-room');
      collab_socket.off('session-end');
    };
  }, [alertCtx, navigate, roomId]);

  const leaveSessionHandler = () => {
    comm_socket.emit('leave-session');
    collab_socket.emit('leave-session');
  };

  return (
    <>
      <Grid container>
        <Grid xs={2} item></Grid>
        <Grid xs={8} item>
          <Typography
            variant="h4"
            fontWeight="lighter"
            textAlign="center"
            sx={{ mb: '40px' }}
          >
            Your technical interview begins...
          </Typography>
        </Grid>
        <Grid xs={2} item justifyContent="flex-end">
          <div className={styles.leave_session_button}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenBackdrop(true)}
            >
              <b>Leave Session</b>
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {/* Question component */}
        <Grid xs={5} item container>
          <QuestionBox />
        </Grid>
        <Grid xs={7} item container direction="column">
          {/* Chat component */}
          <Grid item>
            <ChatBlock socket={comm_socket} roomId={roomId} />
          </Grid>
          {/* Code Editor component */}
          <Grid item>
            <div className={styles.wrap}>
              <div className={styles.code_editor}>
                <CollabEditor socket={collab_socket} roomId={roomId} />
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <CustomBackDrop
        openBackdrop={openBackdrop}
        onClick={() => setOpenBackdrop(false)}
        content="Are you sure you want to leave the 'interview'?"
        primaryAction={{
          text: 'No',
          onClick: () => setOpenBackdrop(false),
        }}
        secondaryAction={{
          text: 'Yes',
          onClick: leaveSessionHandler,
        }}
      />
    </>
  );
}

export default RoomPage;

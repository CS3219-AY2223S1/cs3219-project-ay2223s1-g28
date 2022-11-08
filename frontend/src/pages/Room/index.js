import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import io from 'socket.io-client';

import AlertContext from '../../context/alert-context';
import ChatBlock from '../../components/ui/chat/ChatBlock';
import CustomBackDrop from '../../components/ui/CustomBackdrop';
import QuestionBox from '../../components/ui/question/QuestionBox';
import CollabEditor from '../../components/ui/collaboration/CollabEditor';
import styles from './Room.module.css';

import SplitterContainer from '../../components/layout/SplitterContainer';
import Header from '../../components/ui/Header';

import {
  URL_COMM_SVC_SOCKET,
  PATH_COMM_SVC_SOCKET,
  URL_COLLAB_SVC_SOCKET,
  PATH_COLLAB_SVC_SOCKET,
} from '../../configs';

const comm_socket = io(URL_COMM_SVC_SOCKET, {
  path: PATH_COMM_SVC_SOCKET,
  withCredentials: true,
});
const collab_socket = io(URL_COLLAB_SVC_SOCKET, {
  path: PATH_COLLAB_SVC_SOCKET,
  withCredentials: true,
});

function RoomPage() {
  const alertCtx = useContext(AlertContext);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const openChat = Boolean(anchorEl);

  const roomId = location.state?.room;
  const difficulty = location.state?.difficulty;

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

  const openChatHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeChatHandler = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(to top, #EBFDFC, transparent)',
      }}
    >
      <Grid item xs={11} m="16px 0 0 0">
        <Header text="Your technical interview begins..." />
        <br />
        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpenBackdrop(true)}
        >
          <b>FINISH SESSION</b>
        </Button>
      </Grid>
      <SplitterContainer
        minHeight="30vh"
        textAlign="start"
        primaryChild={
          <>
            <p>Question</p>
            <div className={styles.wrapper}>
              {difficulty ? (
                <QuestionBox difficulty={difficulty} roomId={roomId} />
              ) : (
                <p>
                  You have not successfully selected your difficulty, <br />{' '}
                  please return to home page and try again!
                </p>
              )}
            </div>
          </>
        }
        secondaryChild={
          <>
            <p>Code editor</p>
            <div className={styles.wrapper}>
              <CollabEditor socket={collab_socket} roomId={roomId} />
            </div>
          </>
        }
      />
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
      <Draggable>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          onClick={openChatHandler}
          sx={{ position: 'fixed', bottom: 0, mb: '5px', color: 'white' }}
        >
          <ChatIcon />
          Chat
        </Fab>
      </Draggable>
      <Menu
        anchorEl={anchorEl}
        open={openChat}
        onClose={closeChatHandler}
        sx={{ p: '1px' }}
      >
        <ChatBlock socket={comm_socket} roomId={roomId} />
      </Menu>
    </Grid>
  );
}

export default RoomPage;

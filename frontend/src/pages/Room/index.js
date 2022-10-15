import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Editor from 'react-monaco-editor';

import io from 'socket.io-client';

import ChatBlock from '../../components/ui/chat/ChatBlock';
import QuestionBox from '../../components/ui/question/QuestionBox';
import styles from './Room.module.css';

import { URL_COMM_SVC } from '../../configs';

const socket = io(URL_COMM_SVC);

function RoomPage() {
  // Todo: Use room id prop/state instead in the future
  let { roomId } = useParams();

  useEffect(() => {
    socket.emit('join-room', roomId);
    
    // the listeners must be removed in the cleanup step,
    // in order to prevent multiple event registrations
    return () => {
      socket.off('connect');
      socket.off('join-room');
    }
  }, [roomId]);

  return (
    <div>
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
            <Button variant="outlined" color="error">
              <b>Leave Session</b>
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {/* Question component */}
        <Grid xs={5} item>
          <QuestionBox />
        </Grid>
        <Grid xs={7} item container direction="column">
          {/* Chat component */}
          <Grid item>
            <ChatBlock socket={socket} roomId={roomId} />
          </Grid>
          {/* Code Editor component */}
          <Grid item>
            <div className={styles.code_editor}>
              <Editor
                height="50vh"
                defaultLanguage="javascript"
                defaultValue="Start your coding here..."
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default RoomPage;

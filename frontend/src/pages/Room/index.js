import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import io from 'socket.io-client';

import AlertContext from '../../context/alert-context';
import ChatBlock from '../../components/ui/chat/ChatBlock';
import QuestionBox from '../../components/ui/question/QuestionBox';
import CollabEditor from '../../components/ui/collaboration/CollabEditor';
import styles from './Room.module.css';

import { URL_COMM_SVC_CONNECT } from '../../configs';

const socket = io(URL_COMM_SVC_CONNECT);

function RoomPage() {
	const alertCtx = useContext(AlertContext);
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

		socket.emit('join-room', roomId);

		// the listeners must be removed in the cleanup step,
		// in order to prevent multiple event registrations
		return () => {
			socket.off('connect');
			socket.off('join-room');
		};
	}, [alertCtx, navigate, roomId]);

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
				<Grid xs={5} item container>
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
							<CollabEditor roomId={roomId} />
						</div>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default RoomPage;

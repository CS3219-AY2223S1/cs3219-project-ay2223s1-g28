import { useContext } from 'react';

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import AlertContext from '../../context/alert-context';

import styles from './AlertMessage.module.css';

function AlertMessage() {
  const alertCtx = useContext(AlertContext);

  return (
    <Collapse in={alertCtx.isOpen}>
      <Alert
        className={styles.alert}
        severity={alertCtx.severity}
        open
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={alertCtx.onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alertCtx.message}
      </Alert>
    </Collapse>
  );
}

export default AlertMessage;

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import styles from './IconTextfield.module.css';

function IconTextField({ icon, label, variant = 'filled' }) {
  return (
    <Box className={styles.icon_text_field}>
      {icon}
      <TextField label={label} variant={variant} />
    </Box>
  );
}

export default IconTextField;

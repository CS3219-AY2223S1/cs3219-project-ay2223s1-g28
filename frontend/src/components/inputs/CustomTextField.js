import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import styles from './CustomTextField.module.css';

function CustomTextField(props) {
  const {leftNode, ...textFieldProp} = props;

  return (
    <Box className={styles.icon_text_field}>
      {leftNode}
      <TextField variant='filled' {...textFieldProp}/>
    </Box>
  );
}

export default CustomTextField;

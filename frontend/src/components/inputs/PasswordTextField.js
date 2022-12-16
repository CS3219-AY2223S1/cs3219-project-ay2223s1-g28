import { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';

function PasswordTextField(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { helperText, label, fullWidth: isFullWidth, ...inputProps } = props;

  return (
    <FormControl variant="outlined" fullWidth={isFullWidth}>
      <InputLabel color={helperText && 'error'}>{label}</InputLabel>
      <OutlinedInput
        {...inputProps}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={(e) => handleMouseDownPassword(e)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {helperText && (
        <FormHelperText component={Typography} error>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default PasswordTextField;

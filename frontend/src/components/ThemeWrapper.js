import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function ThemeWrapper(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3fa7a5',
      },
      secondary: {
        main: '#ffffff',
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default ThemeWrapper;

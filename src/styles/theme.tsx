import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#2f2f2f',
    },
    secondary: {
      main: 'rgb(198, 48, 49)',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      paper: '#383838',
    },
    text: {
      primary: '#fff',
      secondary: '#808080'
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default theme;
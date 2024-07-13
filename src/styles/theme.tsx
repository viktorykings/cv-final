import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#121212'
    },
    secondary: {
      main: 'rgb(198, 48, 49)'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#313131'
    },
    text: {
      primary: '#ffffff',
      secondary: '#808080',
      disabled: '#606060'
    }
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
      '"Segoe UI Symbol"'
    ].join(',')
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        disableInjectingGlobalStyles: true
      }
    }
  }
})

export default theme

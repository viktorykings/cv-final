import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// A custom theme for this app
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#2c2c2c',
//     },
//     secondary: {
//       main: 'rgb(198, 48, 49)',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#313131',
//       paper: '#383838',
//     },
//     text: {
//       primary: '#fff',
//       secondary: '#808080',
//       disabled: '#606060'
//     },
//   },
//   typography: {
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//   },
// });
declare module '@mui/material/styles' {
  interface Palette {
    grayIcon: Palette['primary']
  }

  interface PaletteOptions {
    grayIcon?: PaletteOptions['primary']
  }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    grayIcon: true
  }
}
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#121212'
      // main: '#fff'
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
      primary: '#fff',
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

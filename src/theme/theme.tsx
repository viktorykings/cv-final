import { red, grey } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'

const theme = {
  palette: {
    primary: '#f1c232'
  }
}

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#616E5B'
          },
          secondary: {
            main: '#A3B899'
          },
          error: {
            main: red.A400
          },
          background: {
            default: '#fff'
          },
          text: {
            primary: grey[900],
            secondary: grey[800]
          }
        }
      : {
          // palette values for dark mode
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
        }),
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
  }
})

export default theme

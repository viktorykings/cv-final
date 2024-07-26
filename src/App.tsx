import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Main from './components/Main'
import { useThemeContext } from './theme/useThemeContext'

const App = () => {
  const { theme } = useThemeContext()
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Main />
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App

import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Main from './components/Main'
import { useThemeContext } from './theme/useThemeContext'
import { ErrorBoundary } from './ErrorBoundary'

const App = () => {
  const { theme } = useThemeContext()

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary>
          <CssBaseline />
          <Main />
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App

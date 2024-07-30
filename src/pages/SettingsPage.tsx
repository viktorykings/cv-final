import { useThemeContext } from '../theme/useThemeContext'
import { Box, IconButton } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'

const SettingsPage = () => {
  const { mode, toggleColorMode } = useThemeContext()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderColor: 'text.primary',
        border: '1px solid',
        borderRadius: 25,
        p: 2,
        m: 2
      }}
      onClick={toggleColorMode}
    >
      {mode} mode
      <IconButton sx={{ ml: 1 }} color="inherit">
        {mode === 'dark' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Box>
  )
}
export default SettingsPage

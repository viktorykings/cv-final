import { createContext } from 'react'
import { createTheme, Theme } from '@mui/material'

type ThemeContextType = {
  mode: string
  toggleColorMode: () => void
  theme: Theme
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
  theme: createTheme()
})

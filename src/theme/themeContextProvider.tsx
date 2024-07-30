import { FC, PropsWithChildren } from 'react'
import { useColorTheme } from './useColorTheme'
import { ThemeContext } from './themeContext'

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme()
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

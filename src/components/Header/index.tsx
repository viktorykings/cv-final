import { HeaderStyles } from './Header.styles'
import { AppBarProps } from '@mui/material'

interface IHeaderProps extends AppBarProps {
  children: React.ReactNode
}

const Header = ({ children }: IHeaderProps) => {
  return <HeaderStyles>{children}</HeaderStyles>
}

export default Header

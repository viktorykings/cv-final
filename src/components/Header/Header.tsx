import { HeaderStyles } from './Header.styles'
import { IHeaderProps } from './interface'
const Header = ({ children }: IHeaderProps) => {
  return <HeaderStyles>{children}</HeaderStyles>
}

export default Header

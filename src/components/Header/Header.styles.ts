import { AppBar, styled } from '@mui/material'

export const HeaderStyles = styled(AppBar)(({theme}) => ({
  position: 'relative',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  justifyContent: "flex-end",
  height: 64,
}))
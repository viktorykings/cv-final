import { styled } from '@mui/material'

export const BodyContainer = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  backgroundColor: theme.palette.background.default
}))
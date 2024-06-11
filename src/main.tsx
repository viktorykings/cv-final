import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PrivateRoutes } from './routes/PrivateRoutes.tsx'
import { PublicRoutes } from './routes/PublicRoutes.tsx'
import { ThemeProvider } from '@emotion/react'
import theme from './styles/theme.tsx'
import { BodyContainer } from './styles/main.styles.tsx'

const isAuthorised = false
const router = createBrowserRouter(
  isAuthorised ? PrivateRoutes : PublicRoutes,
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BodyContainer>
        <RouterProvider router={router} />
      </BodyContainer>
    </ThemeProvider>
  </React.StrictMode>,
)

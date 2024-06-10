import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PrivateRoutes } from './routes/PrivateRoutes.tsx'
import { PublicRoutes } from './routes/PublicRoutes.tsx'

const isAuthorised = true
const router = createBrowserRouter(
  isAuthorised ? PrivateRoutes : PublicRoutes,
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

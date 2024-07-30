import { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Root from './Root.tsx'
import { Paths } from './paths.ts'
import { LogInPage, SignUpPage } from './lazyRoutes.ts'
import { CircularProgress } from '@mui/material'

export const PublicRoutes: RouteObject[] = [
  {
    path: Paths.AUTH,
    element: (
      <Suspense
        fallback={
          <CircularProgress
            color="secondary"
            sx={{ position: 'absolute', top: '50%', left: '50%' }}
          />
        }
      >
        <Root />
      </Suspense>
    ),

    children: [
      {
        path: Paths.LOGIN,
        element: <LogInPage />
      },
      {
        path: Paths.SIGNUP,
        element: <SignUpPage />
      }
    ]
  }
]

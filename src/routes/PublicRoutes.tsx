import { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Root from './Root.tsx'
import { Paths } from './paths.ts'
import { LogInPage, SignUpPage } from './lazyRoutes.ts'

export const PublicRoutes: RouteObject[] = [
  {
    path: Paths.AUTH,
    element: (
      <Suspense fallback="LOADING...">
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

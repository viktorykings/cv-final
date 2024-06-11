import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import Root from "./Root.tsx";
import {Paths} from './paths.ts'
import { ErrorPage, LogInPage, SignUpPage } from "./lazyRouts.ts";



export const PublicRoutes: RouteObject[] = [
  {
    path: Paths.AUTH,
    element: (
      <Suspense fallback="LOADING...">
        <Root />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    
    children: [
      {
        path: Paths.LOGIN,
        element: <LogInPage />,
      },
      {
        path: Paths.SIGNUP,
        element: <SignUpPage />,
      },
    ],
  },
];
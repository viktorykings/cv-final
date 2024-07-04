import { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Root from './Root.tsx'
import { Paths } from './paths.ts'
import PagesLayout from '../components/PagesLayout.tsx'
import {
  UsersPage,
  ProfilePage,
  SkillsPage,
  LanguagesPage,
  CvsPage,
  DetailsPage,
  PreviewPage,
  ProjectsPage,
  DepartmentsPage,
  PositionsPage,
  SettingsPage
} from './lazyRouts.ts'
import ProfileLayout from '../components/ProfileLayout.tsx'

export const PrivateRoutes: RouteObject[] = [
  {
    path: Paths.INDEX,
    element: (
      <Suspense fallback="LOADING...">
        <Root />
      </Suspense>
    ),

    children: [
      {
        path: Paths.EMPLOYEES,
        element: <PagesLayout />,
        children: [
          { path: ``, element: <UsersPage /> },
          {
            path: `:id`,
            element: <ProfileLayout />,
            children: [
              { path: Paths.PROFILE, element: <ProfilePage /> },
              // { path: Paths.PROFILE, element: <ProfilePage /> },
              { path: Paths.SKILLS, element: <SkillsPage /> },
              { path: Paths.LANGUAGES, element: <LanguagesPage /> },
              { path: Paths.CVS, element: <CvsPage /> }
            ]
          }
        ]
      },
      {
        path: Paths.CVS,
        element: <PagesLayout />,
        children: [
          { path: ``, element: <CvsPage /> },
          { path: `:cvId/${Paths.DETAILS}`, element: <DetailsPage /> },
          { path: `:cvId/${Paths.SKILLS}`, element: <SkillsPage /> },
          { path: `:cvId/${Paths.PREVIEW}`, element: <PreviewPage /> }
        ]
      },

      {
        path: Paths.PROJECTS,
        element: <ProjectsPage />
      },
      {
        path: Paths.SKILLS,
        element: <SkillsPage />
      },
      {
        path: Paths.LANGUAGES,
        element: <LanguagesPage />
      },
      {
        path: Paths.DEPARTMENTS,
        element: <DepartmentsPage />
      },
      {
        path: Paths.POSITIONS,
        element: <PositionsPage />
      },
      {
        path: Paths.SETTINGS,
        element: <SettingsPage />
      }
    ]
  }
]

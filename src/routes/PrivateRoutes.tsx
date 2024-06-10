import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import Root from "./Root.tsx";
import { Paths } from "./paths.ts";
import PagesLayout from "../components/PagesLayout.tsx";
import { ErrorPage, UsersPage, ProfilePage, SkillsPage, LanguagesPage, CvsPage, DetailsPage, PreviewPage, ProjectsPage, DepartmentsPage, PositionsPage, SettingsPage } from "./lazyRouts.ts";


export const PrivateRoutes: RouteObject[] = [
  {
    path: Paths.INDEX,
    element: (
      <Suspense fallback="LOADING...">
        <Root />
      </Suspense>
    ),
    errorElement: <ErrorPage />,

    children: [
      {
        path: Paths.USERS,
        element: <PagesLayout />,
        children: [
          { path: ``, element: <UsersPage /> },
          { path: `:id/${Paths.PROFILE}`, element: <ProfilePage /> },
          { path: `:id/${Paths.SKILLS}`, element: <SkillsPage /> },
          { path: `:id/${Paths.LANGUAGES}`, element: <LanguagesPage /> },
          { path: `:id/${Paths.CVS}`, element: <CvsPage /> },
        ]
      },
      {
        path: Paths.CVS,
        element: <PagesLayout />,
        children: [
          { path: ``, element: <CvsPage /> },
          { path: `:cvId/${Paths.DETAILS}`, element: <DetailsPage /> },
          { path: `:cvId/${Paths.SKILLS}`, element: <SkillsPage /> },
          { path: `:cvId/${Paths.PREVIEW}`, element: <PreviewPage /> },
        ]

      },

      {
        path: Paths.PROJECTS,
        element: <ProjectsPage />,
      },
      {
        path: Paths.SKILLS,
        element: <SkillsPage />,
      },
      {
        path: Paths.LANGUAGES,
        element: <LanguagesPage />,
      },
      {
        path: Paths.DEPARTMENTS,
        element: <DepartmentsPage />,
      },
      {
        path: Paths.POSITIONS,
        element: <PositionsPage />,
      },
      {
        path: Paths.SETTINGS,
        element: <SettingsPage />,
      },
    ],
  },
];
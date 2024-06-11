import { lazy } from "react";

export const LogInPage = lazy(() => import("../pages/LogInPage.tsx"));
export const SignUpPage = lazy(() => import("../pages/SignUpPage.tsx"));
export const ErrorPage = lazy(() => import("../pages/ErrorPage.tsx"));

export const UsersPage = lazy(() => import("../pages/UsersPage.tsx"));
export const ProfilePage = lazy(() => import("../pages/ProfilePage.tsx"));
export const CvsPage = lazy(() => import("../pages/CvsPage.tsx"));
export const DetailsPage = lazy(() => import("../pages/DetailsPage.tsx"));
export const PreviewPage = lazy(() => import("../pages/PreviewPage.tsx"));
export const ProjectsPage = lazy(() => import("../pages/ProjectsPage.tsx"));
export const SkillsPage = lazy(() => import("../pages/SkillsPage.tsx"));
export const LanguagesPage = lazy(() => import("../pages/LanguagesPage.tsx"));
export const DepartmentsPage = lazy(() => import("../pages/DepartmentsPage.tsx"));
export const PositionsPage = lazy(() => import("../pages/PositionsPage.tsx"));
export const SettingsPage = lazy(() => import("../pages/SettingsPage.tsx"));
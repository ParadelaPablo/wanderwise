/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as SigninIndexImport } from './routes/signin/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as ContactIndexImport } from './routes/contact/index'
import { Route as DashboardCreateIndexImport } from './routes/dashboard/create/index'
import { Route as DashboardTripsTripIdImport } from './routes/dashboard/trips/$tripId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SigninIndexRoute = SigninIndexImport.update({
  id: '/signin/',
  path: '/signin/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any)

const ContactIndexRoute = ContactIndexImport.update({
  id: '/contact/',
  path: '/contact/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardCreateIndexRoute = DashboardCreateIndexImport.update({
  id: '/dashboard/create/',
  path: '/dashboard/create/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardTripsTripIdRoute = DashboardTripsTripIdImport.update({
  id: '/dashboard/trips/$tripId',
  path: '/dashboard/trips/$tripId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/contact/': {
      id: '/contact/'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactIndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof rootRoute
    }
    '/signin/': {
      id: '/signin/'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninIndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/trips/$tripId': {
      id: '/dashboard/trips/$tripId'
      path: '/dashboard/trips/$tripId'
      fullPath: '/dashboard/trips/$tripId'
      preLoaderRoute: typeof DashboardTripsTripIdImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/create/': {
      id: '/dashboard/create/'
      path: '/dashboard/create'
      fullPath: '/dashboard/create'
      preLoaderRoute: typeof DashboardCreateIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/contact': typeof ContactIndexRoute
  '/dashboard': typeof DashboardIndexRoute
  '/signin': typeof SigninIndexRoute
  '/dashboard/trips/$tripId': typeof DashboardTripsTripIdRoute
  '/dashboard/create': typeof DashboardCreateIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/contact': typeof ContactIndexRoute
  '/dashboard': typeof DashboardIndexRoute
  '/signin': typeof SigninIndexRoute
  '/dashboard/trips/$tripId': typeof DashboardTripsTripIdRoute
  '/dashboard/create': typeof DashboardCreateIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/contact/': typeof ContactIndexRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/signin/': typeof SigninIndexRoute
  '/dashboard/trips/$tripId': typeof DashboardTripsTripIdRoute
  '/dashboard/create/': typeof DashboardCreateIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/contact'
    | '/dashboard'
    | '/signin'
    | '/dashboard/trips/$tripId'
    | '/dashboard/create'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/contact'
    | '/dashboard'
    | '/signin'
    | '/dashboard/trips/$tripId'
    | '/dashboard/create'
  id:
    | '__root__'
    | '/'
    | '/contact/'
    | '/dashboard/'
    | '/signin/'
    | '/dashboard/trips/$tripId'
    | '/dashboard/create/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ContactIndexRoute: typeof ContactIndexRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
  SigninIndexRoute: typeof SigninIndexRoute
  DashboardTripsTripIdRoute: typeof DashboardTripsTripIdRoute
  DashboardCreateIndexRoute: typeof DashboardCreateIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ContactIndexRoute: ContactIndexRoute,
  DashboardIndexRoute: DashboardIndexRoute,
  SigninIndexRoute: SigninIndexRoute,
  DashboardTripsTripIdRoute: DashboardTripsTripIdRoute,
  DashboardCreateIndexRoute: DashboardCreateIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/contact/",
        "/dashboard/",
        "/signin/",
        "/dashboard/trips/$tripId",
        "/dashboard/create/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/contact/": {
      "filePath": "contact/index.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx"
    },
    "/signin/": {
      "filePath": "signin/index.tsx"
    },
    "/dashboard/trips/$tripId": {
      "filePath": "dashboard/trips/$tripId.tsx"
    },
    "/dashboard/create/": {
      "filePath": "dashboard/create/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

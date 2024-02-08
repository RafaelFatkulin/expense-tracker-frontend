import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const Page404 = lazy(async () => import('./page-404.ui'));

export const page404Route: RouteObject = {
  path: pathKeys.page404(),
  element: createElement(Page404)
};

import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(async () => import('./home-page.ui'));

export const homePageRoute: RouteObject = {
  path: '/',
  element: createElement(HomePage)
};

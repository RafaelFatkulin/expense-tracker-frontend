import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const Login = lazy(async () => import('./login.ui'));
export const loginRoute: RouteObject = {
  path: pathKeys.login(),
  element: createElement(Login)
};

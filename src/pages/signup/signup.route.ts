import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const Signup = lazy(async () => import('./signup.ui'));

export const signupRoute: RouteObject = {
  path: pathKeys.signup(),
  element: createElement(Signup)
};

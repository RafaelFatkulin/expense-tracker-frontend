import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const VerifyMailPage = lazy(async () => import('./verify-mail-page.ui'));

export const verifyMailPageRoute: RouteObject = {
  path: pathKeys.verifyMail(),
  element: createElement(VerifyMailPage)
};

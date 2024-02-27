import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const ChangeMailPage = lazy(async () => import('./change-mail-page.ui'));

export const changeMailPageRoute: RouteObject = {
  path: pathKeys.changeEmail(),
  element: createElement(ChangeMailPage)
};

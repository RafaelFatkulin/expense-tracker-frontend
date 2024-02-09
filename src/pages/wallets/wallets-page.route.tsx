import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const WalletsPage = lazy(async () => import('./wallets-page.ui'));

export const walletsPageRoute: RouteObject = {
  path: '/wallets',
  element: createElement(WalletsPage)
};

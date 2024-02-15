import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const WalletsPage = lazy(async () => import('./wallets-page.ui'));

export const walletsPageRoute: RouteObject = {
  path: pathKeys.wallet.root(),
  element: createElement(WalletsPage)
};

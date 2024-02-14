import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const WalletPage = lazy(async () => import('./wallet-page.ui'));

export const walletPageRoute: RouteObject = {
  path: '/wallets/:walletId',
  element: createElement(WalletPage)
};

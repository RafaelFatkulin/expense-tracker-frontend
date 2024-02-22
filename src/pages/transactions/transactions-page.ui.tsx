import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const TransactionsPage = lazy(async () => import('./transactions-page.route'));

export const transactionsPageRoute: RouteObject = {
  path: pathKeys.wallet.root().concat(':walletId/transactions'),
  element: createElement(TransactionsPage)
};

import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const StatisticsPage = lazy(async () => import('./statistics-page.ui'));

export const statisticsPageRoute: RouteObject = {
  path: 'wallets/:walletId/statistics',
  element: createElement(StatisticsPage)
};

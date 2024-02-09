import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const SettingsPage = lazy(async () => import('./settings-page.ui'));

export const settingsPageRoute: RouteObject = {
  path: '/settings',
  element: createElement(SettingsPage)
};

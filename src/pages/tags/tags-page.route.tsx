import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const TagsPage = lazy(async () => import('./tags-page.ui'));

export const tagsPageRoute: RouteObject = {
  path: pathKeys.tags(),
  element: createElement(TagsPage)
};

import { createBrowserRouter, redirect, RouterProvider, useRouteError } from 'react-router-dom';
import { AuthLayout } from '~pages/auth-layout';
import { homePageRoute } from '~pages/home';
import { loginRoute } from '~pages/login';
import { MainLayout } from '~pages/main-layout';
import { page404Route } from '~pages/page-404';
import { signupRoute } from '~pages/signup';
import { pathKeys } from '~shared/lib/react-router';

const BubbleError = () => {
  const error = useRouteError();
  if (error) {
    console.error(error);
  }
  return null;
};

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <MainLayout />,
        children: [homePageRoute]
      },
      {
        element: <AuthLayout />,
        children: [page404Route, loginRoute, signupRoute]
      },
      {
        // eslint-disable-next-line @typescript-eslint/require-await
        loader: async () => redirect(pathKeys.page404()),
        path: '*'
      }
    ]
  }
]);

export const BrowserRouter = () => {
  return <RouterProvider router={router} />;
};

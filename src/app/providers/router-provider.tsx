import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";
import { homePageRoute } from "~pages/home";

function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  return null;
}

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        children: [
          homePageRoute
        ]
      }
    ]
  }
])

export function  BrowserRouter() {
  return <RouterProvider router={router} />
}

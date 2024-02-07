import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { HomePage } from "./home-page.ui";

export const homePageRoute: RouteObject = {
  path: "/",
  element: createElement(HomePage),
  loader: async (args) => {
    return args
  }
}

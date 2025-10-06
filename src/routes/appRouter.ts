import App from "@/App";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [{ index: true, Component: HomePage }],
  },
]);

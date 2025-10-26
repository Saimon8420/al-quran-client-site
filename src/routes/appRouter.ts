import App from "@/App";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import SurahPage from "@/pages/SurahPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "surah/:surah", Component: SurahPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

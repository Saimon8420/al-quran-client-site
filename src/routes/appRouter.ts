import App from "@/App";
import HomePage from "@/pages/HomePage";
import SurahPage from "@/pages/SurahPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: ":surah", Component: SurahPage },
    ],
  },
]);

import App from "@/App";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import RukuPage from "@/pages/RukuPage";
import SajdaPage from "@/pages/SajdaPage";
import SurahPage from "@/pages/SurahPage";
import PagesPage from "@/pages/PagesPage";
import { createBrowserRouter } from "react-router";
import ManzilPage from "@/pages/ManzilPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "surah/:surah", Component: SurahPage },
      { path: "sajda/:surah/:ayah", Component: SajdaPage },
      { path: "ruku/:surah/:ayah", Component: RukuPage },
      { path: "page/:page", Component: PagesPage },
      { path: "manzil/:id", Component: ManzilPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

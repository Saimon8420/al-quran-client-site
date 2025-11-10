import App from "@/App";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import RukuPage from "@/pages/RukuPage";
import SajdaPage from "@/pages/SajdaPage";
import SurahPage from "@/pages/SurahPage";
import PagesPage from "@/pages/PagesPage";
import { createBrowserRouter } from "react-router";
import ManzilPage from "@/pages/ManzilPage";
import HizbPage from "@/pages/HizbPage";
import JuzPage from "@/pages/JuzPage";
import SerachOverViewPage from "@/pages/SerachOverViewPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "surah/:id", Component: SurahPage },
      { path: "sajda/:surah/:ayah", Component: SajdaPage },
      { path: "ruku/:surah/:ayah", Component: RukuPage },
      { path: "search/:surah/:ayah", Component: SerachOverViewPage },
      { path: "page/:id", Component: PagesPage },
      { path: "manzil/:id", Component: ManzilPage },
      { path: "hizb/:id", Component: HizbPage },
      { path: "juz/:id", Component: JuzPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

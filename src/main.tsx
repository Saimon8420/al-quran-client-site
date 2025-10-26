import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/appRouter";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import ErrorBoundary from "@/components/error-boundary";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>
);

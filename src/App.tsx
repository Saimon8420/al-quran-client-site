import { Outlet } from "react-router";
import AppLayout from "./components/layout/app-layout";

function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default App;

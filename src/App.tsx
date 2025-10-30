import { Outlet } from "react-router";
import AppLayout from "./components/layout/app-layout";
import { useGetMetaDataQuery } from "./components/redux/api/metaDataApi";
import Loader from "./components/ui/loader/loader";

function App() {
  const { isLoading, isFetching } = useGetMetaDataQuery();

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default App;

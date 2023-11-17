import Layout from "./layouts/Layout/Layout";
import MainRoutes from "./layouts/Routes/MainRoutes";
import { useEffect } from "react";
function App() {
  return (
    <>
      <Layout>
        <MainRoutes />
      </Layout>
    </>
  );
}

export default App;

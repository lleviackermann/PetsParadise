import React from "react";
import { Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("./layouts/Home"));
const PetRoutes = React.lazy(() => import("./layouts/pets/PetRoutes"));
const NotFound = React.lazy(() => import("./layouts/NotFound"));
const Payment = React.lazy(() => import("./layouts/Others/Payment"));
const AuthRoutes = React.lazy(() => import("./layouts/pets/AuthRoutes"));

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/pets/*" element={<PetRoutes />} />
          <Route path="/user/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./layouts/Home";
import Payment from "./layouts/Others/Payment";
import PetRoutes from "./layouts/pets/PetRoutes";
import AuthRoutes from "./layouts/pets/AuthRoutes";
import NotFound from "./layouts/NotFound";
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

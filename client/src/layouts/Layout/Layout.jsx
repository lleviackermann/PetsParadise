import NavBar from "../Layout/NavBar";
// import Footer from "../Layout/";
import { useState } from "react";
import Cart from "./Cart";

function Layout(props) {
  const [showCart, setShowCart] = useState(false);
  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };
  return (
    <>
      {showCart && <Cart onClose={hideCartHandler}></Cart>}
      <NavBar showCart={showCartHandler} />
      <main>{props.children}</main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;

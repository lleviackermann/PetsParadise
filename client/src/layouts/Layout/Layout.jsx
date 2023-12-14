import NavBar from "../Layout/NavBar";
// import Footer from "../Layout/";
import { useState } from "react";
import Cart from "./Cart";
import Notification from "../Ui/Notification";
import { useSelector } from "react-redux";
import Footer from "./Footer";

function Layout(props) {
  const [showCart, setShowCart] = useState(false);
  const notification = useSelector((state) => state.ui.notification);
  // console.log("notification", notification);
  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };
  return (
    <>
      {showCart && <Cart onClose={hideCartHandler} />}
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <NavBar showCart={showCartHandler} />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;

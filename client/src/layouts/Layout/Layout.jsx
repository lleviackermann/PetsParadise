import NavBar from "../Layout/NavBar";
import { useState } from "react";
import Cart from "./Cart";
import Notification from "../Ui/Notification";
import { useSelector } from "react-redux";
import Footer from "./Footer";

function Layout(props) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(userInfo);
  let userRole = "User";
  if (
    userInfo != null &&
    (userInfo.role === "Employee" || userInfo.role === "Admin")
  ) {
    userRole = userInfo.role;
  }

  const [showCart, setShowCart] = useState(false);
  const notification = useSelector((state) => state.ui.notification);
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
      {userRole === "User" && <NavBar showCart={showCartHandler} />}
      {/* <NavBar showCart={showCartHandler} /> */}
      <main>{props.children}</main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;

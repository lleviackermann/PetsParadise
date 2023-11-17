import NavBar from "./NavBar";
import Footer from "../Layout/Footer";

function Layout(props) {
  return (
    <>
      {/* <NavBar /> */}
      <main>{props.children}</main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;

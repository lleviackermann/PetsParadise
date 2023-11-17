import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout(props) {
  return (
    <>
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;

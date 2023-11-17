import './navbar.css'; 
// import './navbar.js'; 

const Navbar = () => {
  return (
    <>
      <link rel="stylesheet" href="../../css/components/navbar.css" />
      <script src="../../JavaScript/components/navbar.js" defer></script>

      <header className="components-navbar-header">
        <div className="components-navbar-close-open">
          <span className="material-icons-sharp components-navbar-open"> menu </span>
          <span className="material-icons-sharp components-navbar-close"> close </span>
        </div>

        <div className="components-navbar-brand">
          <div className="components-navbar-brand__logo">
            <span className="material-icons-sharp">pets</span>
          </div>
          <div className="components-navbar-brand__name">
            <a href="/" className="components-navbar-brand__name">
              pets <span>paradise</span>
            </a>
          </div>
        </div>

        <nav className="components-navbar-menu__section">
          <ul className="components-navbar-menu">
            <li className="components-navbar-menu__item"><a href="/">Home</a></li>
            <li className="components-navbar-menu__item second">
              <a href="" className="components-navbar-tag"> Pets </a>
              <ul>
                <li><a href="/dogs">Dogs</a></li>
                <li><a href="/cats">Cats</a></li>
                <li><a href="/birds">Birds</a></li>
                <li><a href="/fish">Fish</a></li>
              </ul>
            </li>
            <li className="components-navbar-menu__item">
              <a href="/pets/vetcare">Vet-Care</a>
            </li>
            <li className="components-navbar-menu__item">
              <a href="/pets/services">Services</a>
            </li>
            <li className="components-navbar-menu__item">
              <a href="/pets/petsFood/petfoods">Pet-Foods</a>
            </li>
            <li className="components-navbar-menu__item components-navbar-last--item">
              <a href="/pets/products">Accesssories</a>
            </li>
          </ul>
        </nav>

        <div className="components-navbar-enter">
          {/* Your conditional rendering logic here */}
        </div>
      </header>
    </>
  );
};

export default Navbar;

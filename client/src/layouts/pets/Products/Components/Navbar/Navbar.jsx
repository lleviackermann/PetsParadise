import React, {  useRef, useState } from 'react'
import './Navbar.css'
// import logo from '../Assets/logo.png'
// import cart_icon from '../Assets/cart_icon.png'
import nav_dropdown from '../Assets/nav_dropdown.png'
import { Link } from 'react-router-dom'
// import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

    const [menu,setMenu] = useState("shop");
    // const {getTotalCartItems}= useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
      {/* <Link to='/' onClick={()=>{setMenu("shop")}} className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </Link> */}
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link to='/pets/products'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("dogs")}}><Link to='/pets/products/dogs'>Dog</Link>{menu==="dogs"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("cats")}}><Link to="/pets/products/cats">Cat</Link>{menu==="cats"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("birds")}}><Link to='/pets/products/birds'>Bird</Link>{menu==="birds"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("fishs")}}><Link to='/pets/products/fishs'>Fish</Link>{menu==="fishs"?<hr/>:<></>}</li>
      </ul>
      {/* <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div> */}
    </div>
  )
}

export default Navbar

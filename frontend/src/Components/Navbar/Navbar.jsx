import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown_icon from "../Assets/navbar_dropdown_icon.png";
import wishlist_icon from "../Assets/wishlist_icon.png";

const Navbar = () => {

    const [menu, setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle("open") //add this class
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOOPER</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown_icon} alt=""/>
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => setMenu("shop")}><Link style={{textDecoration : 'none'}} to='/'>Shop</Link>{menu == "shop"?<hr/>:<></>}</li>
                <li onClick={() => setMenu("men")}><Link style={{textDecoration : 'none'}} to='/men'>Men</Link>{menu == "men"?<hr/>:<></>}</li>
                <li onClick={() => setMenu("women")}><Link style={{textDecoration : 'none'}} to='/women'>Women</Link>{menu == "women"?<hr/>:<></>}</li>
                <li onClick={() => setMenu("Kids")}><Link style={{textDecoration : 'none'}} to='/kids'>Kids</Link>{menu == "Kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem("auth-token")?
                <button onClick={()=>{localStorage.removeItem("auth-token"); window.location.replace("/")}}>Log out</button>
                : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                <Link to='/wishlist' ><img className="wishlist-icon" src={wishlist_icon} alt=""/></Link>
            </div>
        </div>
    );
}

export default Navbar;

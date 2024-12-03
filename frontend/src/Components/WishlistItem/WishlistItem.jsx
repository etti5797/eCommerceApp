import React, { useContext } from "react";
import "./WishlistItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { Link } from "react-router-dom";

const WishlistItem = () => {

    const {all_products, removefromwishlist, wishlistItems} = useContext(ShopContext);

    return (
        <div className="wishlist-items">
            <div className="wishlist-items-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Remove</p>
            </div>
            <hr/>
            {all_products.map((e) => {
                if(wishlistItems[e.id] > 0)
                {
                    return <div>
                        <div className="wishlist-items-format wishlist-items-format-main">
                        <Link to={`/product/${e.id}`}><img src={e.image} alt="" className="wishlisticon-product-icon"/></Link>
                            <p>{e.name}</p>
                            <p> ₪{e.new_price}</p>
                            <img className="wishlist-items-remove-icon" src={remove_icon} alt="" onClick={()=>removefromwishlist(e.id)}/>
                        </div>
                        <hr/>
                    </div>
                }
                return null;
            })}   
        </div>
    );
}

export default WishlistItem;
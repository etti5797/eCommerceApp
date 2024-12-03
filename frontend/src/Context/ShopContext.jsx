import React, { createContext, useEffect, useState } from "react";

/* usecontext help in saving items added to the cart in products pages and present them in the cart page*/

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for( let index = 0; index < 300 + 1; index++){
        cart[index] = 0; 
    }
    return cart;
};

const ShopContextProvider = (props) => {

    const [all_products, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [wishlistItems, setWishlistItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch("http://localhost:4000/allproducts")
        .then(res => res.json())
        .then( data => setAllProducts(data));

        if(localStorage.getItem("auth-token"))
        {
            fetch("http://localhost:4000/getcart",
            {
                method: "POST",
                headers: {
                    Accept : "application/json",
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`
                },
                body: ""
            })
            .then(res => res.json())
            .then(data => setCartItems(data.cartData));

            fetch("http://localhost:4000/getwishlist",
                {
                    method: "POST",
                    headers: {
                        Accept : "application/json",
                        "Content-Type": "application/json",
                        "auth-token": `${localStorage.getItem("auth-token")}`
                    },
                    body: ""
                })
                .then(res => res.json())
                .then(data => setWishlistItems(data.wishListData));
        }

    }, [])

    const addToCart = (itemId) =>
    {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        if(localStorage.getItem("auth-token"))
        {
            fetch("http://localhost:4000/addtocart", {
                method: "POST",
                headers: {
                    Accept : "application/json",
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then(res => res.json())
            .then(data => console.log(data));
        }
    }

    const removeFromCart = (itemId) =>
    {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        if(localStorage.getItem("auth-token"))
            {
                fetch("http://localhost:4000/removefromcart", {
                    method: "POST",
                    headers: {
                        Accept : "application/json",
                        "Content-Type": "application/json",
                        "auth-token": `${localStorage.getItem("auth-token")}`
                    },
                    body: JSON.stringify({"itemId": itemId})
                })
                .then(res => res.json())
                .then(data => console.log(data));
            }
    }

    const addToWishlist = (itemId) =>
    {
        setWishlistItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        if(localStorage.getItem("auth-token"))
        {
            fetch("http://localhost:4000/addtowishlist", {
                method: "POST",
                headers: {
                    Accept : "application/json",
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then(res => res.json())
            .then(data => console.log(data));
        }
    }

    const removefromwishlist = (itemId) =>
    {
        setWishlistItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        if(localStorage.getItem("auth-token"))
            {
                fetch("http://localhost:4000/removefromwishlist", {
                    method: "POST",
                    headers: {
                        Accept : "application/json",
                        "Content-Type": "application/json",
                        "auth-token": `${localStorage.getItem("auth-token")}`
                    },
                    body: JSON.stringify({"itemId": itemId})
                })
                .then(res => res.json())
                .then(data => console.log(data));
            }
    }

    const getTotalCartAmount = () =>
    {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                let itemInfo = all_products.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_products, cartItems, addToCart, removeFromCart, addToWishlist, removefromwishlist, wishlistItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};


export default ShopContextProvider;
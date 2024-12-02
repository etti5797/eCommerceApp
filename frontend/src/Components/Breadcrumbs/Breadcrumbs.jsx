/*Breadcrumbs are a navigational aid that display the user's location within a 
website or app hierarchy, often as a clickable trail*/

import React from "react";
import "./Breadcrumbs.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrumbs = (props) => {
    const {product} = props;
    return(
        <div className="breadcrumbs">
            HOME <img src={arrow_icon} alt=""/> SHOP <img src={arrow_icon} alt=""/> {product.category} <img src={arrow_icon} alt=""/> {product.name}
        </div>
    );
}
export default Breadcrumbs;
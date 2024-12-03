/* Hero is a component for displaying a large box or image with a title and description.*/ 
import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {

    const scrollToNewCollections = () => {
        const new_collections = document.getElementById("new_collections");
        new_collections.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className="hero">
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt =""></img>
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div onClick={()=>scrollToNewCollections()} className="hero-latest-btn">
                    <div>latest collection</div>
                    <img src={arrow_icon} alt=""></img>
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt=""></img>
            </div>
        </div>
    );
}

export default Hero;
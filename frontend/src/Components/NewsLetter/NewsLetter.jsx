import React, { useState } from "react";
import "./NewsLetter.css";
import { set } from "mongoose";
const NewsLetter = () => {
    const [email, setEmail] = useState("");

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const subscribe = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(email.trim() === "")
        {
            alert("Please Enter Email");
        }
        else if(!emailRegex.test(email))
        {
            alert("Please Enter Valid Email");
        }
        else
        {
            fetch("http://localhost:4000/subscribe", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            }).then((response) => response.json())
            .then((data) => {
                setEmail("");
                if(!data.success)
                {
                    alert("Email Already Subscribed");
                }
                else
                {
                    alert("Subscribed Successfully");
                }
            });
        }
        
    };

    return (
        <div className="newsletter">
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>subscribe to our newsletter and stay updated</p>
            <div>
                <input onChange={(e)=>updateEmail(e)} name="email" value={email} type="email" placeholder="Enter Your Email"/>
                <button onClick={subscribe}>Subscribe</button>
            </div>
        </div>
    );
}
export default NewsLetter;
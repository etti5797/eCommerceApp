import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails, [e.target.name]: e.target.value
        });
    };

    const Add_product = async () => {
        let responseData;
        let product = productDetails;

        let formData = new FormData(); /* constructs key-value pairs of form fields and values, including files, for sending to a server via HTTP requests */
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept : 'application/json', /* accept indicates the type of content the client expects to receive in the response*/ 
            },
            body: formData,
        }).then((response) => response.json()).then((data) => {responseData = data;});

        if(responseData.success)
        {
            product.image = responseData.image_url;
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json', /* content-type specifies the media type of the request being sent from the client to the server */
                },
                body: JSON.stringify(product), /*converts a JavaScript object (product) into a JSON string.*/
            }).then((response) => response.json()).then((data) => 
            {
                data.success ? alert("Product Added") : alert("Failed to Add Product");
            });
        }
    }; 

    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here"/>
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here"/>
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here"/>
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image? URL.createObjectURL(image) : upload_area} alt="" className="addproduct-thumnail-img"/>
                </label>
                <input onChange={imageHandler} type="file" id="file-input" name="image" hidden />
            </div>
            <button onClick={() => Add_product()} className="addproduct-btn">ADD</button>
        </div>
    );
}

export default AddProduct;
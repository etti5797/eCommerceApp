const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());  /*parses incoming JSON and makes them available in req.body for easier handling of JSON data */ 
app.use(cors());  

// Database Connection With MongoDB

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

// API Creation

app.get("/", (req, res) =>{
    res.send("E-commerce express app is running");
});

// Image Storage Engine

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: ((req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    })
});
const upload = multer({storage: storage});

// Creating Upload Endpoint For Images

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) =>{
    res.json(
        {
            success: 1,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        }
    );
})


// Schema for Creating Products

const Product = mongoose.model("product", {
    id : {
        type: Number,
        require: true
    },
    name : {
        type: String,
        require: true
    },
    image : {
        type: String,
        require: true
    },
    category : {
        type: String,
        require: true
    },
    new_price : {
        type: Number,
        require: true
    },
    old_price : {
        type: Number,
        require: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    available : {
        type: Boolean,
        default: true
    },
});

// Creating API For Adding Products

app.post("/addproduct", async (req, res) =>{
    let products = await Product.find({});
    let id;
    if(products.length > 0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else
    {
        id = 1;
    }

    const product = new Product({
        id : id,
        name : req.body.name,
        image : req.body.image,
        category : req.body.category,
        new_price : req.body.new_price,
        old_price : req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json(
        {
            success: true,
            name: req.body.name,
        }
    );
});

// Creating API For Deleting Products

app.post('/removeproduct', async (req, res) =>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json(
        {
            success: true,
            name: req.body.name,
        }
    )
});

// Creating API For Getting All Products

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});

// Schema Creating For User Model

const Users = mongoose.model('Users', {
    name : {
        type: String
    },
    email : {
        type: String,
        unique: true,
    },
    password : {
        type: String,
    },
    cartData : {
        type: Object,
    },
    wishListData : {
        type: Object,
    },
    date : {
        type: Date,
        default: Date.now,
    }
})

// Creating Endpoint For Registering User

app.post('/signup', async (req, res)=>{
    let check = await Users.findOne({email: req.body.email});
    if(check)
    {
        return res.status(400).json({success: false, errors: "existing user found with same email address"});
    }
    let cart = {};
    for(let i = 0; i < 300; i++)
    {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
        wishListData: cart,
    });

    await user.save();

    /* jwt authentication */
    const data = {
        user : {
            id: user.id,
        }
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success: true, token});
})

// Creating Endpoint For User Login

app.post('/login', async (req, res) => {
    let user = await Users.findOne({email: req.body.email});
    if(user)
    {
        const passCompare = req.body.password === user.password;
        if(passCompare)
        {
            const data = {
                user : {
                    id: user.id,
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success: true, token});
        }
        else
        {
            res.json({success: false, errors: "wrong password"});
        }
    }
    else
    {
        res.json({success: false, errors: "wrong email id"});
    }
});

// Creating Endpoint For NewCollection Data

app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-9);
    console.log("NewCollection Fetched");
    res.json(newCollection);
});

// Creating Endpoint For Popular In Women Data

app.get('/popularwomen', async (req, res) => {
    let products = await Product.find({category:"women"});
    let popular_in_Women = products.slice(1).slice(0, 3);
    console.log("Popular_in_women Fetched");
    res.send(popular_in_Women);
});

// Creating Endpoint For Subscribing To Newsletter

const Subscribers = mongoose.model('Subscribers', {
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

app.post('/subscribe', async (req, res) => {
    const {email} = req.body;
    const existingSubscriber = await Subscribers.findOne({ email });
    if(existingSubscriber)
    {
        return res.status(400).json({success: false, errors: "Subscriber already exists"});
    }
    const subscriber = new Subscribers({ email });
    await subscriber.save();
    res.json({success: true});
});

// Create Middleware To Fetch User

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send({errors: "Please authenticate using a valid token"});
    }
    else
    {
        try
        {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }
        catch(error)
        {
            res.status(401).send({errors: "Please authenticate using a valid token"});
        }
    }
};

// Creating Endpoint For Adding Products To CartData

app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Added");
});

// Creating Endpoint For Removing Products From CartData

app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
    {
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    }
    res.send("Removed");
});

// Creating Endpoint To Get CartData

app.post('/getcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    res.json({cartData : userData.cartData});
});


// Creating Endpoint For Adding Products To wishListData

app.post('/addtowishlist', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.wishListData[req.body.itemId] === 0)
    {
        userData.wishListData[req.body.itemId] = 1;
        await Users.findOneAndUpdate({_id: req.user.id}, {wishListData: userData.wishListData});
    }
    res.send("Added");  
});

// Creating Endpoint For Removing Products From wishListData

app.post('/removefromwishlist', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.wishListData[req.body.itemId] > 0)
    {
        userData.wishListData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({_id: req.user.id}, {wishListData: userData.wishListData});
    }
    res.send("Removed");
});

// Creating Endpoint To Get wishListData

app.post('/getwishlist', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    res.json({wishListData : userData.wishListData});
});

// Starts the Express server and listens on the specified port

app.listen(port, (error) =>
{
    if(!error)
    {
        console.log(`Server is running on port: ${port}`);
    }
    else
    {
        console.log("Error : " + error);
    }
});
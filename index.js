const express= require('express');
const app=express();
const path= require('path');
const cookieParser = require("cookie-parser");
const { restricttoLoggedin,checkAuth }= require("./middleware/auth");

const urlRoute = require('./Routes/url');
const staticRoute = require('./Routes/staticRoute')
const userRoute = require('./Routes/user');

const { mongodbConnect }=require('./connection');

mongodbConnect("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.use("/url",restricttoLoggedin, urlRoute);
app.use("/",checkAuth,staticRoute);
app.use("/user",userRoute);


const port = 3000;

app.listen(3000,()=>console.log(`Server is running on PORT ${port}`));

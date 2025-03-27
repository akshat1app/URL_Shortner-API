const express= require('express');
const routes=express.Router();
const {HandleTest}= require("../Controllers/url")

routes.get('/',HandleTest);

routes.get('/signup',(req,res)=>{
    return res.render("signup")
})
routes.get('/login',(req,res)=>{
    return res.render("login")
})
routes.get('/forgetPassword',(req,res)=>{
    return res.render("forgetPassword");
})


module.exports=routes;
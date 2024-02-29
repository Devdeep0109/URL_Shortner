const express = require("express");
const URL = require("../models/urls");

const router = express.Router();

router.get('/',async(req ,res)=>{
    const allUrls = await URL.find({});
    return res.render("home" ,{
        urls:allUrls,
    });
});

// signup router
router.get('/signUp' ,(req,res) =>{
    return res.render("signUp");
})

// Login router
router.get('/login' ,(req,res) =>{
    return res.render("login");
})

module.exports = router;
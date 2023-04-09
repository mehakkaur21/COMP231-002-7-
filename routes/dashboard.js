const express = require("express");
const router = express.Router();
const isAuth = require('../middelwear/isAuth');
const bookingController = require('../controller/booking');
const { check, body } = require('express-validator/check');

router.get('/dashboard',(req,res,next)=>{
    res.render('dashboard',{
        pageTitle:'Dashboard',
        path:'/dashboard'
    })
})

exports.router = router;

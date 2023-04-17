const express = require("express");
const router = express.Router();
const User = require('../model/users');
const isAuth = require('../middelwear/isAuth');
const bookingController = require('../controller/booking');
const { check, body } = require('express-validator/check');

router.get('/dashboard',(req,res,next)=>{
User.findById(req.session.user._id)
.then(user=>{
    res.render('dashboard',{
        pageTitle:'Dashboard',
        path:'/dashboard',
        notifications:user.notifications
    })
})
    
})
router.get('/requests',bookingController.getAllBookings)
router.get('/requestDetails/:bookingId',bookingController.getBookingsById)
router.get('/myCustomers',bookingController.getMyCustomers)

exports.router = router;

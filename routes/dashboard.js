const express = require("express");
const router = express.Router();
const User = require('../model/users');
const isAuth = require('../middelwear/isAuth');
const isUser = require('../middelwear/isUser');
const isCleaner = require('../middelwear/isCleaner');
const bookingController = require('../controller/booking');
const { check, body } = require('express-validator/check');

router.get('/dashboard', isAuth, (req, res, next) => {
    User.findById(req.session.user._id)
        .then(user => {
            res.render('dashboard', {
                pageTitle: 'Dashboard',
                path: '/dashboard',
                notifications: user.notifications
            })
        })

})
router.get('/requests', isAuth, isCleaner, bookingController.getAllBookings)
router.get('/requestDetails/:bookingId', isAuth, isCleaner, bookingController.getBookingsById)
router.get('/myCustomers', isAuth, isCleaner, bookingController.getMyCustomers)

exports.router = router;

const express = require("express");
const router = express.Router();
const isAuth = require('../middelwear/isAuth');

router.get('/dashboard', isAuth, (req, res, next) => {
    res.render('dashboard', {
        pageTitle: 'Book Service',
    })
})

router.get('/manageServices', isAuth, (req, res, next) => {
    res.render('dashboardIncludes/manageServices', {
        pageTitle: 'Manage Services',
    })
})

exports.router = router;

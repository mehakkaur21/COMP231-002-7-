const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Welcome to Home Page')
    res.render('index', {
        pageTitle: 'Cleaning Services',
        
    })
})

exports.router = router;
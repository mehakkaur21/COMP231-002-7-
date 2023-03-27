const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Welcome to Home Page')
    res.render('index', {
        pageTitle: 'Cleaning Services',
    })
})
router.get('/login', (req, res, next) => {
    console.log('Login')
    res.render('login', {
        pageTitle: 'Login | WeClean',
    })
})
router.get('/signup', (req, res, next) => {
    res.render('signup', {
        pageTitle: 'Signup | WeClean',
    })
})

exports.router = router;
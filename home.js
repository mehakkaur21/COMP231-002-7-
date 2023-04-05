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
    res.render('auth/login', {
        pageTitle: 'Login | WeClean',
    })
})
router.get('/signup', (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Signup | WeClean',
    })
})

router.get('/dashboard',(req,res,next)=>{
    res.render('dashboard', {
        pageTitle: 'Dashboard | WeClean',
    })
})
router.get('/manageServices',(req,res,next)=>{
    res.render('dashboardIncludes/manageServices', {
        pageTitle: 'Dashboard | WeClean',
    })
})

exports.router = router;
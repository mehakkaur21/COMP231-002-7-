const express = require("express");
const router = express.Router();
const isAuth = require('../middelwear/isAuth');
const adminController = require('../controller/admin');


router.get('/users',adminController.getAllUsers)
router.get('/cleaners',adminController.getAllCleaners)
router.get('/userDetails/:userId',adminController.getUserDetails);

exports.router = router;

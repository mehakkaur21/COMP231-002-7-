const express = require("express");
const router = express.Router();
const isAuth = require('../middelwear/isAuth');
const isAdmin = require('../middelwear/isAdmin');
const adminController = require('../controller/admin');


router.get('/users',isAuth,isAdmin,adminController.getAllUsers)
router.get('/cleaners',isAuth,isAdmin,adminController.getAllCleaners)
router.get('/userDetails/:userId',isAuth,isAdmin,adminController.getUserDetails);
router.post('/deleteUser/:userId', isAuth,isAdmin, adminController.deleteUser);

exports.router = router;

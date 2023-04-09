const Booking = require('../model/bookings');
const { validationResult } = require('express-validator/check');

exports.postBooking = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const address = req.body.address;
    const pinCode = req.body.pinCode;
    const locationType = req.body.locationType;
    const bookingDate = req.body.bookingDate;
    const startingTime = req.body.startingTime;
    const desiredService = req.body.desiredService;
    const details = req.body.details;
    const userId = req.session.user._id;
    const bookingStatus = "Pending";
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('dashboard', {
            pageTitle: 'Dashboard | One Step Away Cleaner',
            path: "/SignUp",
            message: errors.array()[0].msg,
            messageClass: "errorFlash",
            contactNumber: contactNumber,
            address: address,
            pinCode: pinCode,
            locationType: locationType,
            bookingDate: bookingDate,
            startingTime: startingTime,
            desiredService: desiredService,
            dateOfBooking: dateNow,
            timeOfBooking: time,
            details: details,
        });
    }
    // Date and time 
    const date2 = new Date();
    var dateNow = `${date2.getDate()} ${date2.toLocaleString('default', { month: 'short' })} ${date2.getFullYear()}`;
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var time = strTime;

    console.log(firstName, lastName, email, contactNumber, address, pinCode, locationType, bookingDate, startingTime, desiredService, dateNow, time, details);
    res.redirect('/dashboard');
    const booking = new Booking({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        contactNumber: contactNumber,
        address: address,
        pinCode: pinCode,
        locationType: locationType,
        bookingDate: bookingDate,
        startingTime: startingTime,
        desiredService: desiredService,
        dateOfBooking: dateNow,
        timeOfBooking: time,
        details: details,
        bookingStatus: bookingStatus
    })
    booking.save();
}

exports.getBookings = (req, res, next) => {
    const userId = req.session.user._id;


    Booking.find({ userId: userId })
        .then(bookingsData => {
            res.render('dashboardIncludes/manageServices', {
                pageTitle: 'My Bookings',
                bookings: bookingsData.reverse(),
                path: '/myBookings',
                message: null,
                messageClass: "",
            })
        })
        .catch(err => {
            console.log("Some Error Occured", err);
        })
}

// 
exports.getEditBooking = (req, res, next) => {
    const bookingId = req.params.bookingId;
    Booking.findById(bookingId)
        .then(booking => {
            res.render('dashboard', {
                pageTitle: 'Edit Booking',
                path: '/editBooking',
                firstName: booking.firstName,
                lastName: booking.lastName,
                email:booking.email,
                message: booking.details,
                contactNumber: booking.contactNumber,
                address: booking.address,
                pinCode: booking.pinCode,
                locationType: booking.locationType,
                bookingDate: booking.bookingDate,
                startingTime: booking.startingTime,
                desiredService: booking.desiredService,
                dateOfBooking: booking.dateOfBooking,
                timeOfBooking: booking.timeOfBooking,
                details: booking.details,
                message: null,
                messageClass: '',
                bookingId:bookingId
            })
        })
}

exports.postEditBooking = (req, res, next) => {
    const bookingId = req.body.bookingId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const address = req.body.address;
    const pinCode = req.body.pinCode;
    const locationType = req.body.locationType;
    const bookingDate = req.body.bookingDate;
    const startingTime = req.body.startingTime;
    const desiredService = req.body.desiredService;
    const details = req.body.details;
    const userId = req.session.user._id;
    const bookingStatus = "Pending";
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('dashboard', {
            pageTitle: 'Edit Booking | One Step Away Cleaner',
            path: "/editBooking",
            firstName:firstName,
            lastName:lastName,
            email:email,
            message: errors.array()[0].msg,
            messageClass: "errorFlash",
            contactNumber: contactNumber,
            address: address,
            pinCode: pinCode,
            locationType: locationType,
            bookingDate: bookingDate,
            startingTime: startingTime,
            desiredService: desiredService,
            dateOfBooking: '',
            timeOfBooking: '',
            details: details,
        });
    }


    Booking.findById(bookingId)
        .then(booking => {
            booking.firstName = firstName;
            booking.lastName = lastName;
            booking.email = email;
            booking.contactNumber = contactNumber;
            booking.address = address;
            booking.pinCode = pinCode;
            booking.locationType = locationType;
            booking.bookingDate = bookingDate;
            booking.startingTime = startingTime;
            booking.desiredService = desiredService;
            booking.details = details;

            booking.save().then(result => {
                console.log(result);
            }).then(result=>{
                Booking.find({ userId: req.session.user._id })
                .then(bookingsData => {
                    res.render('dashboardIncludes/manageServices', {
                        pageTitle: 'My Bookings',
                        bookings: bookingsData.reverse(),
                        path: '/myBookings',
                        message: "Booking Details Edited Successfully",
                        messageClass: "successFlash",
                    })
                })
                .catch(err => {
                    console.log("Some Error Occured", err);
                })
            })
        })
}

exports.deleteBooking=(req,res,next)=>{
    const bookingId=req.body.bookingId;
    console.log(bookingId)
    Booking.findByIdAndDelete(bookingId)
    .then(result=>{
        console.log(result);
        console.log('Booking Deleted');
        Booking.find({ userId: req.session.user._id })
        .then(bookingsData => {
            res.render('dashboardIncludes/manageServices', {
                pageTitle: 'My Bookings',
                bookings: bookingsData.reverse(),
                path: '/myBookings',
                message: "Booking Canceled Successfully",
                messageClass: "successFlash",
            })
        })
        .catch(err => {
            console.log("Some Error Occured", err);
        })
    })
}
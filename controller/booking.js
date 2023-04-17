const User = require('../model/users');
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

    // Date and time 
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateNow = date.toLocaleDateString('en-US', options);
    const options2 = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Toronto' };
    const time = new Date().toLocaleTimeString('en-US', options2);

    if (!errors.isEmpty()) {
        return res.render('booking', {
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

    console.log(firstName, lastName, email, contactNumber, address, pinCode, locationType, bookingDate, startingTime, desiredService, dateNow, time, details);
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
    booking.save().then(result => {
        console.log(result);
        User.findById(userId).then(user => {
            user.notifications.push({
                notification: `Your booking request for ${desiredService} has been generated, Booking ID: ${result._id}. Our cleaners will accept your request soon`,
                notificationTime: time,
                notificationDate: dateNow,
                notificationClass: "notificationGreen"
            })
            user.save();
        })
        res.redirect('/dashboard');

    });



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
exports.getAllBookings = (req, res, next) => {
    Booking.find()
        .then(bookingsData => {
            res.render('dashboardIncludes/requests', {
                pageTitle: 'Requests',
                bookings: bookingsData,
                path: '/Requests',
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
            res.render('booking', {
                pageTitle: 'Edit Booking',
                path: '/editBooking',
                firstName: booking.firstName,
                lastName: booking.lastName,
                email: booking.email,
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
                bookingId: bookingId
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
            firstName: firstName,
            lastName: lastName,
            email: email,
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
            }).then(result => {
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
                    .then(result => {
                        const date = new Date();
                        const options = { year: 'numeric', month: 'long', day: 'numeric' };
                        const dateNow = date.toLocaleDateString('en-US', options);
                        const options2 = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Toronto' };
                        const time = new Date().toLocaleTimeString('en-US', options2);

                        User.findById(userId).then(user => {
                            user.notifications.push({
                                notification: `Your booking request for ${desiredService} has been edited. Booking Id: ${bookingId} Our cleaners will accept your request soon`,
                                notificationTime: time,
                                notificationDate: dateNow,
                                notificationClass: "notificationYellow"
                            })
                            user.save();
                        })
                        res.redirect('/dashboard');
                    })
                    .catch(err => {
                        console.log("Some Error Occured", err);
                    })
            })
        })
}

exports.deleteBooking = (req, res, next) => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateNow = date.toLocaleDateString('en-US', options);
    const options2 = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Toronto' };
    const time = new Date().toLocaleTimeString('en-US', options2);
    const bookingId = req.body.bookingId;
    console.log(bookingId);
    var userId = '';
    var desiredService = '';
    var message=''
   Booking.findById(bookingId).then(booking=>{
   if(req.session.user.userType==='user'){
    message =`Booking for ${booking.desiredService} with Booking ID: ${bookingId} has been canceled by you`
   }
   if(req.session.user.userType==='cleaner'){
    message =`${booking.firstName} ${booking.lastName}'s Booking for ${booking.desiredService} with Booking ID: ${bookingId} has been canceled by you`
    User.findById(booking.userId)
    .then(user=>{
        user.notifications.push({
            notification: `Your Booking for ${booking.desiredService} with Booking ID: ${bookingId} has been canceled by our cleaner ${booking.cleanerDetails[0].firstName} ${booking.cleanerDetails[0].lastName}`,
            notificationTime: time,
            notificationDate: dateNow,
            notificationClass: "notificationRed"
        })
        user.save();
    })    
   }
   })
   .then(result=>{
    Booking.findByIdAndDelete(bookingId)
    .then(result => {
        console.log(result);
        console.log('Booking Deleted');
    })
    .then(result => {
        User.findById(req.session.user._id)
        .then(user => {
            user.notifications.push({
                notification: message,
                notificationTime: time,
                notificationDate: dateNow,
                notificationClass: "notificationRed"
            })
            user.save();
        })

        return res.redirect('/dashboard');
    })
   })
 
        .catch(err => {
            console.log("Some Error Occured", err);
        })
    }
exports.getBookingsById = (req, res, next) => {
    const bookingId = req.params.bookingId;
    Booking.findById(bookingId)
        .then(bookingsData => {
            res.render('dashboardIncludes/requestDetails', {
                pageTitle: 'Booking Details',
                booking: bookingsData,
                path: '/myBookings',
                message: null,
                messageClass: "",
            })
        })
        .catch(err => {
            console.log("Some Error Occured", err);
        })
}

exports.acceptBooking = (req, res, next) => {
    const cleanerFName = req.body.firstName;
    const cleanerLName = req.body.lastName;
    const bookingId = req.body.bookingId;
    const contactNumber = req.body.contactNumber;
    const cleanersMessage = req.body.cleanersMessage;
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateNow = date.toLocaleDateString('en-US', options);
    const options2 = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Toronto' };
    const time = new Date().toLocaleTimeString('en-US', options2);
    const cleanerDetails = [{
        firstName: cleanerFName,
        lastName: cleanerLName,
        contactNumber: contactNumber,
        cleanersMessage: cleanersMessage,
        cleanerId: (req.session.user._id).toString()
    }]
    Booking.findById(bookingId)
        .then(booking => {
            booking.cleanerDetails = cleanerDetails;
            booking.bookingStatus = "Ongoing";
            booking.save().then(result => {


                User.findById(req.session.user._id).then(user => {
                    user.notifications.push({
                        notification: `You have accepted ${result.firstName}'s booking request with Booking Id: ${bookingId}`,
                        notificationTime: time,
                        notificationDate: dateNow,
                        notificationClass: "notificationYellow"
                    })
                    user.save();
                })
                User.findById(result.userId)
                    .then(user => {
                        user.notifications.push({
                            notification: `Your Booking request with Booking Id: ${bookingId} has been accepted by our cleaner ${req.session.user.firstName} ${req.session.user.lastName}`,
                            notificationTime: time,
                            notificationDate: dateNow,
                            notificationClass: "notificationGreen"
                        })
                        user.save();
                    })
                res.redirect('/dashboard');
            });

        })
}

exports.getMyCustomers = (req, res, next) => {
    var myBookings = []
    var obj;
    Booking.find()
        .then(bookings => {
            // bookings.forEach(booking=>{
            //     console.log(booking.cleanerDetails[0].cleanerId,req.session.user._id)
            // })
            myBookings = bookings.filter(booking => {
                if (booking.cleanerDetails.length) {
                    obj = booking.cleanerDetails[0];
                    console.log(obj.cleanerId);
                    return obj.cleanerId === req.session.user._id.toString();
                }
            })
            console.log("My Bookings", myBookings)
            res.render('dashboardIncludes/myCustomers', {
                pageTitle: 'Requests',
                bookings: myBookings,
                path: '/myCustomers',
                message: null,
                messageClass: "",
            });
        })
}
exports.bookingCompleted = (req, res, next) => {
    const bookingId = req.body.bookingId;
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateNow = date.toLocaleDateString('en-US', options);
    const options2 = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Toronto' };
    const time = new Date().toLocaleTimeString('en-US', options2);

    Booking.findById(bookingId)
        .then(booking => {
            booking.bookingStatus = 'Completed';
            booking.save();
            User.findById(booking.userId)
            .then(user => {
                user.notifications.push({
                    notification: `Your Booking request with Booking Id: ${bookingId} has been completed by our cleaner ${req.session.user.firstName} ${req.session.user.lastName}`,
                    notificationTime: time,
                    notificationDate: dateNow,
                    notificationClass: "notificationdGreen"
                })
                user.save();
            })
            
            User.findById(req.session.user._id)
            .then(user => {
                user.notifications.push({
                    notification: `Congratulations, You have completed the booking request with Booking Id: ${bookingId}`,
                    notificationTime: time,
                    notificationDate: dateNow,
                    notificationClass: "notificationdGreen"
                })
                user.save();
            })
            
            res.redirect('/dashboard');
        })

}
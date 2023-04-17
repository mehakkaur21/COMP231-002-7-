const User = require('../model/users');
const Booking = require('../model/bookings');

exports.getAllUsers = (req, res, next) => {
    User.find({ userType: 'user' })
        .then(users => {
            console.log(users)
            return res.render('dashboardIncludes/users', {
                pageTitle: 'Users',
                path: '/users',
                users: users,
                searchUser: '',
                dataType: 'Users',
                message: null,
                messageClass: ''
            })
        })
}
exports.getAllCleaners = (req, res, next) => {
    User.find({ userType: 'cleaner' })
        .then(users => {
            console.log(users)
            return res.render('dashboardIncludes/users', {
                pageTitle: 'Users',
                path: '/users',
                users: users,
                searchUser: '',
                dataType: 'Cleaners',
                message: null,
                messageClass: ''
            })
        })
}

exports.getUserDetails = (req, res, next) => {
    userId = req.params.userId;
    var userDetail = null;
    User.findById(userId)
        .then(user => {
            userDetail = user;
            console.log(user);
            return user;
        }).then(response => {
            Booking.find({ userId: userId })
                .then(bookings => {
                    return res.render('dashboardIncludes/userDetails', {
                        pageTitle: 'User Detials',
                        path: '/userDetails',
                        user: userDetail,
                        bookings: bookings
                    })
                })
        })
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByIdAndDelete(userId)
        .then(response => {
            const date = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const dateNow = date.toLocaleDateString('en-US', options);
            const options2 = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Toronto' };
            const time = new Date().toLocaleTimeString('en-US', options2);
            User.findById(req.session.user._id).then(user => {
                user.notifications.push({
                    notification: `User with User Id: ${response._id} and Username: ${response.firstName} has been deleted`,
                    notificationTime: time,
                    notificationDate: dateNow,
                    notificationClass: "notificationRed"
                })
                user.save();
            })
        })
        .catch(err => {
            console.log(err);
        })
    Booking.deleteMany({ userId: userId })
        .then(result => {
            console.log(result);
            User.find({ userType: 'user' })
                .then(users => {
                    console.log(users)
                    return res.render('dashboardIncludes/users', {
                        pageTitle: 'Users',
                        path: '/users',
                        users: users,
                        searchUser: '',
                        dataType: 'Users',
                        message: 'Successfully Deleted',
                        messageClass: 'successFlash'
                    })
                })
        })
        .catch(err => {
            console.log(err);
        })
}
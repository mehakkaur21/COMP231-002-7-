const User = require('../model/users');

exports.getAllUsers = (req, res, next) => {
    User.find({userType:'user'})
        .then(users => {
            console.log(users)
            return res.render('dashboardIncludes/users', {
                pageTitle: 'Users',
                path: '/users',
                users: users,
                searchUser: '',
                dataType:'Users'
            })
        })
}
exports.getAllCleaners = (req, res, next) => {
    User.find({userType:'cleaner'})
    .then(users => {
        console.log(users)
        return res.render('dashboardIncludes/users', {
            pageTitle: 'Users',
            path: '/users',
            users: users,
            searchUser: '',
            dataType:'Cleaners'
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
            User.find({ userId: userId })
                .then(surveys => {
                    return res.render('dashboardIncludes/userDetails', {
                        pageTitle: 'User Detials',
                        path: '/user',
                        user: userDetail,
                        surveys: []
                    })
                })
        })
}

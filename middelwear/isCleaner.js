module.exports = (req, res, next) => {
    if (req.session.user.userType !== 'admin') {
        if (req.session.user.userType !== 'cleaner') {
            req.flash('error', 'Only Cleaners Can Access');
            req.flash('className', 'errorFlash');
            return res.redirect('/login');
        } else {
            console.log('Only Cleaners Or Admin Can Access');
        }
    }

    next();
}
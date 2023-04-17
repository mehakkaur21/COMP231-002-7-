module.exports = (req, res, next) => {
    if (req.session.user.userType !== 'admin') {
        req.flash('error', 'Only Admins Can Access');
        req.flash('className', 'errorFlash');
        return res.redirect('/login');
    } else {
        console.log('Only Users Can Access');
    }
    next();
}
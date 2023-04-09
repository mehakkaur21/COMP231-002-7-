module.exports = (req, res, next) => {
    if (req.session.user.userType !== 'user') {
        req.flash('error', 'Only Users Can Access');
        req.flash('className', 'errorFlash');
        return res.redirect('/login');
    } else {
        console.log('Only Users Can Access');
    }
    next();
}
exports.get404 = (req, res, next) => {
    res.status(404).render('error404', {
      pageTitle: 'Error 404',
      path: ''
    });
  };
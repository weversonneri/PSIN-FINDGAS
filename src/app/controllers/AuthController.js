const passport = require('passport');

module.exports = {
  index(req, res) {
    return res.render('pages/login');
  },

  store(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true,
    })(req, res, next);
  },

  delete(req, res) {
    req.logout();
    res.redirect('/login');
  },
};

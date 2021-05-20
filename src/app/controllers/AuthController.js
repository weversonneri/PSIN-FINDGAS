const passport = require('passport');

module.exports = {
  index(req, res) {
    return res.render('pages/login');
  },

  store(req, res, next) {
    // eslint-disable-next-line consistent-return
    passport.authenticate('local', (err, user) => {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      // eslint-disable-next-line no-shadow
      req.logIn(user, (err) => {
        if (err) { return next(err); }

        if (user.scope_id === 1) {
          return res.redirect('/admin-dashboard');
        }
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  },

  delete(req, res) {
    req.logout();
    res.redirect('/login');
  },
};

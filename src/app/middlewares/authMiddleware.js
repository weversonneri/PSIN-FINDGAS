module.exports = {
  // eslint-disable-next-line consistent-return
  authMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    console.log('Login required!');
    res.redirect('/login');
  },

  notAuthMiddleware(req, res, next) {
    if (req.isAuthenticated() && req.user.scope_id === 1) {
      res.redirect('/admin-dashboard');
    }
    if (req.isAuthenticated() && req.user.scope_id === 3) {
      res.redirect('/dashboard');
    }
    return next();
  },
};

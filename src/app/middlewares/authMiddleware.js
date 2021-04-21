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
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    }
    return next();
  },
};

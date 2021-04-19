module.exports = {
  authMiddleware: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    console.log('Login required!');
    res.redirect("/api/login");
  },

  notAuthMiddleware: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/api/dashboard");
    }
    return next();
  }
}

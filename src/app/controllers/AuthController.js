
module.exports = {
  index(req, res) {
    return res.render("login")
  },

  delete(req, res) {
    req.logout();
    res.redirect('/api/login');
  },
};

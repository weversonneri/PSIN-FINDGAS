module.exports = {
  index(req, res) {
    console.log(req.isAuthenticated())
    return res.render("dashboard", { user: req.user })
  },
}

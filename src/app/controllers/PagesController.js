module.exports = {
  createTOF(req, res) {
    return res.render('pages/terms-of-use', {
      user: req.user,
    });
  },
  createPP(req, res) {
    return res.render('pages/privacy-policy', {
      user: req.user,
    });
  },

};

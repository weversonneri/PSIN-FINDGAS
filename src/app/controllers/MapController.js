const { User } = require('../models');

module.exports = {
  async index(req, res) {
    const local = await User.findAll({ attributes: ['name', 'latitude', 'longitude'] });
    // console.log(local);
    return res.render('index', { locals: local });
  },
};

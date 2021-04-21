const { User } = require('../models');

module.exports = {
  map(req, res) {
    return res.render('index');
  },

  async index(req, res) {
    try {
      const local = await User.findAll({ attributes: ['name', 'latitude', 'longitude'] });

      return res.json(local);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },
};

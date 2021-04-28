const { VendorData } = require('../models');

module.exports = {
  create(req, res) {
    // console.log(local);
    return res.render('pages/index');
  },

  async index(req, res) {
    try {
      const local = await VendorData.findAll({ attributes: ['name', 'latitude', 'longitude'] });

      return res.render('pages/index', { locals: local });
      // return res.status(200).json(local);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

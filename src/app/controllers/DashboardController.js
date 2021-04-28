const { VendorData } = require('../models');
const { User } = require('../models');

module.exports = {
  async create(req, res) {
    return res.render('pages/dashboard', { user: req.user });
  },

  async index(req, res) {
    try {
      const { id } = req.user;
      // console.log('TESTEEEEEEEEE', id);
      const datas = await VendorData.findAll({
        where: { user_id: id },
        attributes: ['name', 'phone', 'latitude', 'longitude'],
      });
      // console.log(datas);
      return res.render('pages/dashboard', { user: req.user, datas });
      // return res.render('pages/index', { locals: local });
      // return res.status(200).json(datas);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};

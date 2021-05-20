const { VendorData } = require('../models');
const { User } = require('../models');

module.exports = {
  async create(req, res) {
    return res.render('pages/dashboard', { user: req.user });
  },

  async createAdmin(req, res) {
    return res.render('pages/admin-dashboard', { user: req.user });
  },

  async index(req, res) {
    try {
      const { id } = req.user;
      const datas = await VendorData.findAll({
        where: { user_id: id },
        attributes: ['id', 'name', 'phone', 'latitude', 'longitude'],
      });
      // console.log(datas);
      return res.render('pages/dashboard', { user: req.user, addresses: datas });
      // return res.render('pages/index', { locals: local });
      // return res.status(200).json(datas);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};

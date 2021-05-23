const { VendorData } = require('../models');
const { User } = require('../models');

module.exports = {
  async create(req, res) {
    if (req.user.scope_id === 1) {
      return res.redirect('/admin-dashboard');
    }
    return res.render('pages/dashboard', { user: req.user });
  },

  async createAdmin(req, res) {
    if (req.user.scope_id !== 1) {
      return res.redirect('/dashboard');
    }
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
      if (req.user.scope_id === 1) {
        return res.redirect('/admin-dashboard');
      }
      return res.render('pages/dashboard', { user: req.user, addresses: datas });
      // return res.render('pages/index', { locals: local });
      // return res.status(200).json(datas);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};

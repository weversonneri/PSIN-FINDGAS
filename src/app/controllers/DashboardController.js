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
        include: {
          model: User,
          attributes: ['subscription'],
        },
      });
      if (req.user.scope_id === 1) {
        return res.redirect('/admin-dashboard');
      }

      if (req.user.subscription === 'N') {
        if (datas.length < 1) {
          return res.render('pages/dashboard', { user: req.user, addresses: datas });
        }
        return res.render('pages/dashboard', { user: req.user, addresses: [datas[0]] });
      }
      // const result = datas.filter((item) => item.User.subscription === 'N');
      // if (req.U) {
      //   return res.status(200).json(result[0]);
      // }

      // return res.status(200).json(datas);
      // console.log('subscription', req.user.subscription);
      // console.log(datas);

      return res.render('pages/dashboard', { user: req.user, addresses: datas });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};

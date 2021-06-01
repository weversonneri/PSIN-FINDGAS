const { VendorData } = require('../models');
const { User } = require('../models');
const { PlanId } = require('../models');

module.exports = {
  create(req, res) {
    if (req.user.scope_id === 1) {
      return res.redirect('/admin-dashboard');
    }
    return res.render('pages/dashboard', { user: req.user });
  },

  async createUpdateAdmin(req, res) {
    try {
      if (req.user.scope_id !== 1) {
        return res.redirect('/dashboard');
      }
      const { user_id } = req.params;

      const datas = await User.findOne({
        where: { id: user_id },
        attributes: ['id', 'name', 'phone', 'email', 'subscription'],
      });

      return res.render('pages/admin-edit-user', { user: req.user, datas });
    } catch (error) {
      req.flash('error', error.message);

      return res.status(403).redirect('/dashboard');
    }
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
        attributes: ['id', 'name', 'phone', 'latitude', 'longitude', 'gasprice', 'address'],
        include: {
          model: User,
          attributes: ['subscription'],
        },
        order: [
          ['updated_at', 'DESC'],
        ],
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

  async indexAdmin(req, res) {
    try {
      if (req.user.scope_id !== 1) {
        return res.redirect('/dashboard');
      }
      const datas = await User.findAll({
        attributes: ['id', 'name', 'email', 'phone', 'subscription'],
      });

      console.log(datas);
      return res.render('pages/admin-dashboard', { user: req.user, datas });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },

  async updateAdmin(req, res) {
    try {
      if (req.user.scope_id !== 1) {
        return res.redirect('/dashboard');
      }

      const { user_id } = req.params;

      const user = await User.findByPk(user_id);

      if (req.body.plan === 'P') {
        await user.update({ subscription: 'P' });
        req.flash('message', 'Dado atualizado!');
        return res.redirect('/admin-dashboard');
      }

      const plan = await PlanId.findOne({ where: { user_id } });

      await user.update({ subscription: 'N' });
      await plan.destroy();

      req.flash('message', 'Dado atualizado!');
      return res.redirect('/admin-dashboard');
    } catch (error) {
      req.flash('error', error.message);
      return res.status(403).redirect('/admin-dashboard');
    }
  },
};

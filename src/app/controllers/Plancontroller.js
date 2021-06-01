const { User } = require('../models');
const { PlanId } = require('../models');

module.exports = {
  async store(req, res) {
    try {
      const req_query = req.query.preapproval_plan_id;
      const req_user = req.user.id;

      if (!req_query || !req_user) {
        return res.redirect('/');
      }

      const user = await User.findByPk(req_user);

      const hasPlan = await PlanId.findOne({ where: { user_id: req_user } });

      if (hasPlan) {
        console.log('PLANO ATIVO');
        return res.redirect('/profile');
      }

      await PlanId.create({
        preapproval_plan_id: req_query,
        user_id: req_user,
      });

      await user.update({ subscription: 'P' });

      return res.render('pages/succsess-page', {
        user: req.user,
      });
    } catch (error) {
      // console.log(error);
      req.flash('error', error.message);
      return res.status(403).redirect('/');
    }
  },

};
// 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c93808478f916c701790b89e99e0b36'

// https://findgas.herokuapp.com/?preapproval_id=2c93808479aa1ad30179c34cbd480746

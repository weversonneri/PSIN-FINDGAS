const { VendorData } = require('../models');
const { User } = require('../models');

module.exports = {
  create(req, res) {
    return res.render('pages/vendorData', {
      user: req.user,
    });
  },

  async store(req, res) {
    try {
      const { user_id } = req.params;
      const {
        name,
        phone,
        latitude,
        longitude,
      } = req.body;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      console.log({ name, user_id });

      await VendorData.create({
        name,
        phone,
        latitude,
        longitude,
        user_id,
      });

      req.flash('message', 'Endereço cadastrado');
      return res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
      req.flash('error', error.message);

      return res.status(403).redirect('/register');
    }
  },

};

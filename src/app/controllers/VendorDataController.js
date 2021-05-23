const { VendorData } = require('../models');
const { User } = require('../models');

module.exports = {
  create(req, res) {
    return res.render('pages/vendorData', {
      user: req.user,
    });
  },

  async show(req, res) {
    try {
      const { vendordata_id } = req.params;
      const user = req.user.id;

      const datas = await VendorData.findOne({
        where: { user_id: user, id: vendordata_id },
        attributes: ['id', 'name', 'phone', 'latitude', 'longitude'],
      });
      return res.render('pages/vendorData-edit', { user: req.user, datas });
    } catch (error) {
      req.flash('error', error.message);

      return res.status(403).redirect('/dashboard');
    }
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

      const datas = await VendorData.findAll({
        where: { user_id },
      });

      if (datas.length >= 1 && user.subscription === 'N') {
        req.flash('message', 'NAO AUTO');
        return res.redirect('/dashboard');
      }

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

      return res.status(403).redirect('/dashboard');
    }
  },

  async update(req, res) {
    try {
      const { vendordata_id } = req.params;

      const vendorData = await VendorData.findByPk(vendordata_id);

      if (!vendorData) {
        req.flash('error', 'Error!');
        return res.status(400).redirect('/dashboard');
      }

      const data = req.body;

      await vendorData.update(data);

      req.flash('message', 'Endereço atualizado');
      return res.status(201).redirect('/dashboard');
    } catch (error) {
      req.flash('error', error.message);

      return res.status(403).redirect('/dashboard');
    }
  },

  async delete(req, res) {
    try {
      const { vendordata_id } = req.params;

      const vendorData = await VendorData.findByPk(vendordata_id);

      if (!vendorData) {
        return res.status(400).json({ error: 'Data not found!' });
      }

      await vendorData.destroy();

      req.flash('message', 'Endereço deletado');
      return res.status(201).redirect('/dashboard');
    } catch (error) {
      req.flash('error', error.message);

      return res.status(403).redirect('/dashboard');
    }
  },

};

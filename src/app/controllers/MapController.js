const { VendorData } = require('../models');
const { User } = require('../models');

module.exports = {
  create(req, res) {
    // console.log(local);
    return res.render('pages/index', { user: req.user });
  },

  async index(req, res) {
    try {
      const local = await VendorData.findAll({
        attributes: ['id', 'name', 'phone', 'latitude', 'longitude', 'address', 'gasprice'],
        include: {
          model: User,
          attributes: ['subscription'],
        },
      });
      return res.status(200).json(local);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async show(req, res) {
    try {
      const { detail_id } = req.params;

      const data = await VendorData.findOne({
        where: { id: detail_id },
        attributes: ['name', 'phone', 'latitude', 'longitude', 'address', 'gasprice'],
      });

      return res.render('pages/provider-detail', { data });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

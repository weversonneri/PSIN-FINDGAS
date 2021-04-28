const { User } = require('../models');

module.exports = {
  create(req, res) {
    return res.render('pages/register');
  },

  /* async index(req, res) {
     return res.render('pages/dashboard', { user: req.user });

       try {
         const users = await User.findAll({
           attributes: ['id', 'name', 'email'],
           include: {
             model: Scope,
             attributes: ['name'],
           },
           raw: true,
           nest: true,
         });
         return res.json(users);
       } catch (error) {
         console.log(error);
         return res.json(error);

   },} */

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'name', 'email', 'scope_id'],
      });

      return res.json(user);
    } catch (error) {
      return res.json(null);
    }
  },

  async store(req, res) {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
      } = req.body;

      if (password !== confirmPassword) {
        req.flash('error', 'As senhas nao coincidem');
        return res.redirect('/register');
      }

      await User.create({ name, email, password });

      req.flash('message', 'Cadastro realizado com sucesso!');
      return res.status(201).redirect('/login');
    } catch (error) {
      // console.log(error);
      req.flash('error', error.message);
      return res.status(403).redirect('/register');
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ errors: 'User not found!' });
      }

      await user.update(req.body);

      const { name, email } = user;

      return res.status(200).json({ name, email });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ errors: 'User not found!' });
      }

      await user.destroy();

      return res.json(null);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

};

const bcrypt = require('bcryptjs');
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
      // const { user_id } = req.user;

      // const user_data = await User.findOne({
      //   where: { user_id },
      //   attributes: ['id', 'name', 'email', 'scope_id', 'subscription'],
      // });
      return res.render('pages/profile', { user: req.user });
    } catch (error) {
      req.flash('error', error.message);
      return res.status(403).redirect('/dashboard');
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
      const { user_id } = req.params;
      const user = await User.findByPk(user_id);

      if (!user) {
        req.flash('error', 'Error!');
        return res.status(400).redirect('/dashboard');
      }

      if (user.scope_id !== req.user.scope_id) {
        req.flash('error', 'Nao é premitido alterar seu scope');
        return res.status(401).redirect('/dashboard');
      }

      const {
        name,
        email,
        password,
        new_password,
      } = req.body;

      if (new_password) {
        if (new_password && new_password.length < 6) {
          req.flash('error', 'Tamanho mínimo de senha de seis caracteres');
          return res.status(201).redirect('/profile');
        }

        const compare_password = await bcrypt.compare(password, user.password_hash);

        if (new_password && !compare_password) {
          req.flash('error', 'A senha antiga está incorreta');
          return res.status(201).redirect('/profile');
        }
      }

      console.log(req.body);

      await user.update({ name, email, password: new_password });

      req.flash('message', 'Cadastro atualizado!');
      return res.status(201).redirect('/profile');
    } catch (error) {
      req.flash('error', error.message);
      return res.status(403).redirect('/profile');
    }
  },

  async delete(req, res) {
    try {
      // const user = await User.findByPk(req.params.user_id);

      // if (!user) {
      //   req.flash('error', 'Error!');
      //   return res.status(400).redirect('/dashboard');
      // }

      // await user.destroy();
      console.log(req.user);
      req.flash('message', 'Conta deletada!');
      return res.status(200).redirect('/login');
    } catch (error) {
      req.flash('error', error.message);
      return res.status(403).redirect('/profile');
    }
  },

};

/* eslint-disable indent */
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../app/models');

// eslint-disable-next-line func-names
module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // eslint-disable-next-line consistent-return
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      return done(error, null);
    }
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
    // eslint-disable-next-line consistent-return
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, { message: 'Usuario não encontrado!' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
          return done(null, false, { message: 'Email ou senha incorreta!' });
        }
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));
};

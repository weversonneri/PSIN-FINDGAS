const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const routes = require('./routes');
const { sequelize } = require('./app/models/index');
require('dotenv').config();
require('./config/auth')(passport);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './app', 'views'));

app.use(express.static('public'));

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1d
}));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3030;

app.use(routes);

app.use((req, res, next) => {
  const error = new Error('Page not found!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.log(error);
  return res.send({
    erro: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log('🔥 Server started');

  sequelize.authenticate().then(() => {
    console.log('✅ Connected with database.');
  })
    .catch((error) => {
      console.error('❌ Unable to connect to the database: ', error);
    });
});

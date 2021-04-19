const express = require('express');
const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const MapController = require('./app/controllers/MapController');

const passport = require('passport');

const { authMiddleware, notAuthMiddleware } = require('./app/middlewares/authMiddleware');

routes.get('/login', notAuthMiddleware, AuthController.index);
routes.post('/login', notAuthMiddleware, passport.authenticate('local', {
  successRedirect: '/api/dashboard',
  failureRedirect: '/api/login',
  failureFlash: true,
}));

routes.get('/logout', authMiddleware, AuthController.delete);

routes.get('/dashboard', authMiddleware, MapController.index);


routes.get('/register', notAuthMiddleware, UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);



module.exports = routes;

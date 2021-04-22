const express = require('express');

const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const MapController = require('./app/controllers/MapController');
const { authMiddleware, notAuthMiddleware } = require('./app/middlewares/authMiddleware');

routes.get('/index', MapController.index);

routes.get('/login', notAuthMiddleware, AuthController.index);
routes.post('/login', notAuthMiddleware, AuthController.store);

routes.get('/logout', authMiddleware, AuthController.delete);

routes.get('/register', notAuthMiddleware, UserController.create);
routes.post('/register', notAuthMiddleware, UserController.store);

routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.get('/dashboard', authMiddleware, UserController.index);

module.exports = routes;

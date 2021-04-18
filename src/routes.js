const express = require('express');
const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const authMiddleware = require('./app/middlewares/authMiddleware');
const MapController = require('./app/controllers/MapController');

routes.get('/', MapController.index);
routes.get('/users', UserController.create);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.post('/auth', AuthController.store);

module.exports = routes;

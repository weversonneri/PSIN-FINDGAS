const express = require('express');

const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const MapController = require('./app/controllers/MapController');
const { authMiddleware, notAuthMiddleware } = require('./app/middlewares/authMiddleware');
const VendorDataController = require('./app/controllers/VendorDataController');
const DashboardController = require('./app/controllers/DashboardController');

routes.get('/', MapController.create);
routes.get('/map', MapController.index);
routes.get('/provider-detail/:detail_id', MapController.show);

routes.get('/login', notAuthMiddleware, AuthController.index);
routes.post('/login', notAuthMiddleware, AuthController.store);

routes.get('/logout', authMiddleware, AuthController.delete);

routes.get('/register', notAuthMiddleware, UserController.create);
routes.post('/register', notAuthMiddleware, UserController.store);

routes.get('/profile', authMiddleware, UserController.show);
routes.post('/profile-edit', authMiddleware, UserController.update);
routes.post('/profile-delete', authMiddleware, UserController.delete);

routes.get('/dashboard', authMiddleware, DashboardController.index);
routes.get('/admin-dashboard', authMiddleware, DashboardController.createAdmin);

routes.get('/vendordata/register', authMiddleware, VendorDataController.create);
routes.post('/vendordata/register/:user_id', authMiddleware, VendorDataController.store);
routes.get('/vendordata/:vendordata_id', authMiddleware, VendorDataController.show);
routes.post('/vendordata/update/:vendordata_id', authMiddleware, VendorDataController.update);
routes.post('/vendordata/delete/:vendordata_id', authMiddleware, VendorDataController.delete);

module.exports = routes;

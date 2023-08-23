const { Router } = require('express');
const requestController = require('./requestController.js');
const routes = Router();
const authSession = require('./authSession.js');

routes.post('/login', requestController.login);
routes.post('/register', requestController.register);

module.exports = routes;
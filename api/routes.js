const { Router } = require('express');
const requestController = require('./requestController.js');
const routes = Router();

routes.post('/login', requestController.login);

module.exports = routes;
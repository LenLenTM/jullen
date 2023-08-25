const { Router } = require('express');
const requestController = require('./requestController.js');
const routes = Router();
const authSession = require('./authSession.js');

routes.post('/login', requestController.login);
routes.post('/register', requestController.register);
routes.post('/toggleConfirmation', requestController.toggleConfirmation);
routes.post('/submitComment', requestController.submitComment);

routes.get('/verifyUser', requestController.verifyUser);
routes.get('/logout', requestController.logout);
routes.get('/getUsername', requestController.getUsername);

module.exports = routes;
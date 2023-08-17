import express from 'express';
import requestController from './requestController.js';
const routes = express.Router();
const requestControllerInstance = new requestController();

routes.post('/login', requestControllerInstance.login.bind(requestController));

export default routes;
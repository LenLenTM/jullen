const { Router } = require('express');
const requestController = require('./requestController.js');
const routes = Router();
const path = require('path');

routes.post('/login', requestController.login);
routes.post('/register', requestController.register);
routes.post('/toggleConfirmation', requestController.toggleConfirmation);
routes.post('/submitComment', requestController.submitComment);
routes.post('/submitEmail', requestController.submitEmail);
routes.post('/changePassword', requestController.changePassword);

routes.get('/verifyUser', requestController.verifyUser);
routes.get('/logout', requestController.logout);
routes.get('/getUsername', requestController.getUsername);
routes.get('/getUserConfiguration', requestController.getUserConfiguration);
routes.get('/guestInfo', requestController.guestInfo);
routes.get('/isAdmin', (req, res) => {
    if  (req.session.superuser === true){
        console.log("is admin (routes");
        return res.status(200).send("is admin");
    }
    else {
        console.log("is not admin routes");
        return res.status(403).send("is not admin");
    }
});

module.exports = routes;
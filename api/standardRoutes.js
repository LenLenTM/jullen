const { Router } = require('express');
const standardRoutes = Router();
const authSession = require('./authSession.js');
const path = require('path');
const requestController = require('./requestController.js');

/*standardRoutes.get('/loggedTest', authSession, (req, res, next) => {
    console.log("standardRoutes");
    res.redirect('/allGood');
});*/

standardRoutes.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

standardRoutes.get('/userPage', (req, res) => {
    if (req.session.authenticate === true){
        res.sendFile(path.join(__dirname, '../private/userPage.html'));
    }
})

standardRoutes.get('/changePassword', (req, res) => {
    if (req.session.authenticate === true){
        res.sendFile(path.join(__dirname, '../private/changePassword.html'));
    }
})

standardRoutes.get('/admin', (req, res) => {
    if (req.session.authenticate === true && req.session.superuser === true){
        console.log("is admin");
        res.sendFile(path.join(__dirname, '../private/admin.html'));
    }
    else {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }
})

module.exports = standardRoutes;
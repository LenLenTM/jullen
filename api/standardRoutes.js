const { Router } = require('express');
const standardRoutes = Router();
const authSession = require('./authSession.js');
const path = require('path');

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

module.exports = standardRoutes;
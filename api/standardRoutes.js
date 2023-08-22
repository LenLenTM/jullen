const { Router } = require('express');
const standardRoutes = Router();
const authSession = require('./authSession.js');
const path = require('path');

standardRoutes.get('/loggedTest', authSession, (req, res, next) => {
    console.log("standardRoutes");
    res.redirect('/allGood');
});

standardRoutes.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = standardRoutes;
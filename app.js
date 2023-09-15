const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const Redis = require('ioredis');

const app = express();
const hostname = '10.10.10.100';
const PORT = 443;

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: 'sa876SS22/sasa', //process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {maxAge: oneDay},
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());

const routes = require('./api/routes.js');
const standardRoutes = require('./api/standardRoutes');
app.use('/api', routes);
app.use('/', standardRoutes);

const options = {
    key: fs.readFileSync("/home/Lena/jullen/certs/_.jullen.at_private_key.key"),
    cert: fs.readFileSync("/home/Lena/jullen/certs/jullen.at_ssl_certificate.cer"),
};

https.createServer(options, app).listen(PORT, hostname, () => console.log("Server started"));

//TODO: deny bruteforce login
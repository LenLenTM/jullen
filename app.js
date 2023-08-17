import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import nodeSession from 'express-session';
import fs from 'fs';
import https from 'https';

//const path = import('path');
//const express = import('express');
//const cookieParser = import('cookie-parser');
//const nodeSession = import('express-session');
//const fs = import('fs');
//const https = import('https');
//const bodyParser = require('body-parser');


const app = express();
const hostname = '10.10.10.100';
const PORT = 443;
const oneDay = 1000 * 60 * 60 * 24;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(nodeSession({
    secret:"le262na18",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(cookieParser());
//app.use(bodyParser.json());

//const routes = require('./api/routes.js');
import routes from './api/routes.js';
app.use('/api', routes);

const options = {
    key: fs.readFileSync("/home/Lena/jullen/certs/_.jullen.at_private_key.key"),
    cert: fs.readFileSync("/home/Lena/jullen/certs/jullen.at_ssl_certificate.cer"),
};

https.createServer(options, app).listen(PORT, hostname, () => console.log("Server started"));
const fetch = require('node-fetch');
const {response} = require("express");
const fs = require('fs');
const mysql = require('mysql');
const crypto = require('crypto');

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "JullenMarriageGuestlist"
});

connection.connect(function (err){});

class Data {

    register(req, res){

        const value = req.body.username.concat(req.body.password);
        const sha512 = crypto.createHash('sha512');
        const hash = sha512.update(value).digest('hex');

        //connection.connect(function (err){});

        connection.query('SELECT * FROM guests WHERE username=?', [req.body.username], function (err, result) {
            if(err) throw err;
            if (result.length === 0) {
                let sql = "INSERT INTO guests (username, passwordHash) VALUES (?, ?)";
                connection.query(sql, [req.body.username, hash], function (err, result) {
                    if (err) throw err;
                    console.log("User added");
                    //connection.end();
                });
            }
            else {
                console.log("User already exists");
            }
        });

        return "ok";
    }

    login(req, res){

        const user = req.body;

        const value = user.username.concat(user.password);
        const sha512 = crypto.createHash('sha512');
        const hash = sha512.update(value).digest('hex');

        let queryResult;

        /*connection.connect(function(err) {
            if (err) throw err;
            connection.query('SELECT * FROM guests WHERE passwordHash=?', [hash], function (err, result) {
                if (err) throw err;
                if (result.length === 0){
                    return res.status(403).send("Bad credentials");
                }
                else {
                    req.session.authenticate = true;
                    req.session.user = queryResult[0].username;

                    return res.status(200).send("Login okay");
                }
            });
        });*/

        connection.query('SELECT * FROM guests WHERE passwordHash=?', [hash], function (err, result) {
            if (err) throw err;
            if (result.length === 0){
                return res.status(403).send("Bad credentials");
            }
            else {
                req.session.authenticate = true;
                req.session.user = queryResult[0].username;

                return res.status(200).send("Login okay");
            }
        });
    }

    verifyUser(req, res){
        if (req.session.authenticate === true){
            return res.status(200).send("User logged in");
        }
        else {
            return res.status(403).send("User not logged in");
        }
    }

}

module.exports = new Data();
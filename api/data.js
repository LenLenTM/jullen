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

class Data {

    register(req, res){

        const value = req.body.username.concat(req.body.password);
        const sha512 = crypto.createHash('sha512');
        const hash = sha512.update(value).digest('hex');

        connection.connect(function (err){});

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
        const hash = crypto.createHash('sha512', value).digest('hex');

        let queryResult;

        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            connection.query('SELECT * FROM guests WHERE passwordHash=?', [hash], function (err, result) {
                if (err) throw err;
                queryResult = result;
                console.log(result[0].username);
            });
        });

        if (queryResult[0].passwordHash && queryResult[0].username === user.username){
            req.session.authenticate = true;
            req.session.user = queryResult[0].username;
        }
        else {
            res.status(403).json({ msg: "Bad credentials" });
            return "Bad credentials";
        }

        return "userPage.html";
    }

}

module.exports = new Data();
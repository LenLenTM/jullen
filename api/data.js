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
                req.session.user = result[0].username;

                return res.status(200).send("Login okay");
            }
        });
    }

    logout(req, res){
        req.session.destroy();

        return res.status(200).send("Logged out");
    }

    verifyUser(req, res){
        if (req.session.authenticate === true){
            return res.status(200).send("User logged in");
        }
        else {
            return res.status(403).send("User not logged in");
        }
    }

    toggleConfirmation(req, res){
        connection.query('update guests set commited = ? where username = ?', [req.body.confirmation, req.session.user], function (err, result) {
            if (err) throw err;
        });

        return res.status(200).send('Confirmation updated');
    }

    submitComment(req, res){
        connection.query('update guests set comment = ? where username = ?', [req.body.comment, req.session.user], function (err, result) {
            if (err) throw err;
        });

        return res.status(200).send('Comment send');
    }

    getUserConfiguration(req, res){
        connection.query('select * from guests where username = ?', [req.session.user], function (err, result) {
            if (err) throw err;
            if (result.length !== 0){
                console.log(result[0].comment);
                return res.status(200).send({confirmation: result[0].commited, comment: result[0].comment});
            }
        });
        //return res.status(403).send('Could not find user configuration');
    }

}

module.exports = new Data();
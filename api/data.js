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


        connection.query('SELECT * FROM guests WHERE passwordHash=?', [hash], async function (err, result) {
            if (err) throw err;
            if (result.length === 0) {
                connection.query("select * from guests where username = ?", [user], async function (err2, result2) {
                    if (err2) throw err2;
                    if (result2.length !== 0){
                        const failedAttempts = result2[0].failedAttempts++;
                        const currentTimestamp = new Date().toISOString();
                        connection.query('update guests set failedAttempts = ?, lastLoginAttempt = ? where username = ?', [failedAttempts, currentTimestamp, user], function (err, result) {
                            if (err) throw err;
                        });
                    }
                })
                return res.status(403).send("Bad credentials");
            } else {
                req.session.authenticate = true;
                req.session.user = result[0].username;
                if (result[0].admin === 1){
                    req.session.superuser = true;
                }
                const currentTimestamp = new Date().toISOString();
                connection.query('update guests set failedAttempts = 0, lastLoginAttempt = ? where username = ?', [currentTimestamp, user], function (err, result) {
                    if (err) throw err;
                });
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

    submitEmail(req, res){
        connection.query('update guests set email = ? where username = ?', [req.body.email, req.session.user], function (err, result) {
            if (err) throw err;
        });

        return res.status(200).send('Email send');
    }

    getUserConfiguration(req, res){
        connection.query('select * from guests where username = ?', [req.session.user], function (err, result) {
            if (err) throw err;
            if (result.length !== 0){
                return res.status(200).send({confirmation: result[0].commited, comment: result[0].comment,
                                            sex: result[0].sex, name: result[0].username.toString(),
                                            email: result[0].email});
            }
        });
        //return res.status(403).send('Could not find user configuration');
    }

    changePassword(req, res) {

        let password = req.body.password;
        let username = req.session.user;

        const value = username.concat(password);
        const sha512 = crypto.createHash('sha512');
        const hash = sha512.update(value).digest('hex');

        connection.query('update guests set passwordHash = ? where username = ?', [hash, req.session.user], function (err, result) {
            if (err) throw err;
        });

        return res.status(200).send('Changed password');
    }

    guestInfo(req, res){

        let guestlist = [];

        connection.query('select * from guests where username = ?', [req.session.user], function (err, result) {
            if (err) throw err;
            if (result.length !== 0) {
                if (result[0].admin === 1) {
                    connection.query('select username, commited, comment, email from guests', function (err, result) {
                        result.forEach((tupel) => guestlist.push(tupel));
                        return res.status(200).send(guestlist);
                    });
                }
            }
            //return res.status(412).send('Error loading user data');
        });
    }

    bruteforceAttackProtection(username, res){

        connection.query('select * from guests where username = ?', [username], async function (err, result){
            if (err) throw err;
            if (result.length !== 0){
                const saveDuration = 600000; // 10 minutes
                // TODO: implement fields in database "lastLoginAttempt" & "failedAttempts"
                const lastLogin = result[0].lastLoginAttempt;
                let failedAttempts = result[0].failedAttempts;
                const currentTimestamp = new Date().toISOString();
                const difference = (new Date(currentTimestamp) - new Date(lastLogin));

                // if time since last login attempt is longer than 10 minutes subtract (passed times / 10 minutes) from failed login attempts
                if (difference > saveDuration && failedAttempts > 0){
                    const subtrahend = Math.floor(difference / saveDuration);
                    failedAttempts -= subtrahend;

                    if (failedAttempts < 0) failedAttempts = 0;

                    connection.query('update guests set failedAttempts = ? where username = ?', [failedAttempts, username], function (err, result) {
                        if (err) throw err;
                    });
                }

                if (failedAttempts >= 5 && difference < saveDuration){
                    return res.status(403);
                }
                else {
                    return res.status(200);
                }
            }
        })
    }
}

module.exports = new Data();
const fetch = require('node-fetch');
const {response} = require("express");
const fs = require('fs');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "JullenMarriageGuestlist"
});

class Data {

    login(){

        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO guests (username, passwordHash) VALUES ('Julia', 'asdT22s2GJ2g8TT2n')";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });

        return "userPage.html";

    }

}

module.exports = new Data();
const model = require("./data.js");
const { request } = require('express');

class RequestController {

    async login(req, res){

        //let user = req.body;
        //let password = req.body.user.password;
        //console.log(user.username + " | " + user.password);

        //TODO: validate user credentials

        res.send(model.login(req, res));
    }

    async register(req, res){

        //let user = req.body;
        //let password = req.body.user.password;
        //console.log(user.username + " | " + user.password);

        //TODO: validate user credentials

        if (req.body.secret === "le262na18"){
            res.send(model.register(req, res));
        }
        else {
            res.send("Bad secret");
        }

    }
}

module.exports = new RequestController();
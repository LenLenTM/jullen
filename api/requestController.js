const model = require("./data.js");
const { request } = require('express');

class RequestController {

    login(req, res){

        let username = req.body.user.username;
        let password = req.body.user.password;

        //TODO: validate user credentials

        res.send(model.login(req.body));
    }
}

module.exports = new RequestController();
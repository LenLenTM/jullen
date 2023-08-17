const model = require("./data.js");
const { request } = require('express');

class RequestController {

    async login(req, res){

        let user = req.body;
        //let password = req.body.user.password;

        console.log(user.username + " | " + user.password);

        //TODO: validate user credentials

        res.send(model.login(req.body));
    }
}

module.exports = new RequestController();
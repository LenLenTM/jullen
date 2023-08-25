const model = require("./data.js");
const { request } = require('express');

class RequestController {

    async verifyUser(req, res){
        return model.verifyUser(req, res);
    }

    async getUsername(req, res){
        return res.status(200).send(req.session.user);
    }

    async login(req, res){

        //let user = req.body;
        //let password = req.body.user.password;
        //console.log(user.username + " | " + user.password);

        //TODO: validate user credentials

        return model.login(req, res);
    }

    async logout(req, res){
        return model.logout(req, res);
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

    async toggleConfirmation(req, res){

        if (req.session.authenticate === true){
            return model.toggleConfirmation(req, res);
        }

        return res.status(403).send('Could not update confirmation status');
    }

    async submitComment(req, res){
        if (req.session.authenticate === true){
            return model.submitComment(req, res);
        }

        return res.status(403).send('Could not submit comment');
    }

    async getUserConfiguration(req, res){
        if (req.session.authenticate === true){
            return model.getUserConfiguration(req, res);
        }

        return res.status(403).send('Could not fetch user configuration');
    }
}

module.exports = new RequestController();
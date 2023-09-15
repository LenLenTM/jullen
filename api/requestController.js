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

        let password = req.body.password;
        let username = req.body.username;

        await model.bruteforceAttackProtection(username, res);

        if (res.status !== 200){
            return res.status(403).send("Too many login attempts. Try again later.");
        }

        /*if (model.bruteforceAttackProtection(username, res).res.status !== 200){
            return res.status(403).send("Too many login attempts. Try again later.");
        }*/

        if (password.toString().length > 20){
            return res.status(403).send("Password too long");
        }
        else if (username.toString().length > 30){
            return res.status(403).send("Username too long");
        }
        else if (username.toString().length < 4){
            return res.status(403).send("Username too short");
        }
        else if (password.toString().length < 8){
            return res.status(403).send("Password too short");
        }
        else if (containsSpecialChars(username)){
            return res.status(403).send("Username must not contain special characters");
        }
        else if (containsNumbers(username)){
            return res.status(403).send("Username must not contain numbers");
        }

        return model.login(req, res);
    }

    async logout(req, res){
        return model.logout(req, res);
    }

    async register(req, res){

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

    async submitEmail(req, res){
        if (req.session.authenticate === true){
            return model.submitEmail(req, res);
        }

        return res.status(403).send('Could not submit email');
    }

    async getUserConfiguration(req, res){
        if (req.session.authenticate === true){
            return model.getUserConfiguration(req, res);
        }

        return res.status(403).send('Could not fetch user configuration');
    }

    async changePassword(req, res){

        const password = req.body.password;

        if (password.toString().length < 8){
            return res.status(403).send('Password too short');
        }
        else if (password.toString().length > 20){
            return res.status(403).send('Password too long');
        }

        if(req.session.authenticate === true){
            return model.changePassword(req, res);
        }

        return res.status(403).send('Could not change password');
    }

    async guestInfo(req, res){
        if (req.session.authenticate === true){
            return model.guestInfo(req, res);
        }

        return res.status(403).send('Error collecting guest data');
    }
}

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}

function containsNumbers(str) {
    return /\d/.test(str);
}

module.exports = new RequestController();
import data from "./data.js";
import request from 'express';

class RequestController {

    async login(req, res){

        let username = req.body.user.username;
        let password = req.body.user.password;

        //TODO: validate user credentials
        res.send(data.login(req.body));
    }
}

export default RequestController;